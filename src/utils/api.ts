import fetch, { fileFromSync } from 'node-fetch';
import { fileTypeFromFile } from 'file-type';

import { type IFile } from '../classes/App.js';

export type ApiOutputKeys = 'data' | 'size' | 'error';

export interface IApiOutputSuccess {
  data: string;
  size: number;
  error: null;
}

export interface IApiOutputError {
  data: null;
  size: null;
  error: Error;
}

export type ApiOutput = IApiOutputSuccess | IApiOutputError;

export interface IApiResultInput {
  size: number;
  type: string;
}

export interface IApiResultOutput {
  width: number;
  height: number;
  ratio: number;
  url: string;
}

export interface IApiResultSuccess {
  input: IApiResultInput;
  output: IApiResultInput & IApiResultOutput;
}

export interface IApiResultError {
  error: string;
  message: string;
}

export type IApiResult = IApiResultSuccess | IApiResultError;

export const request = async (file: IFile): Promise<ApiOutput> => {
  const type = await fileTypeFromFile(file.path);
  const mimeType = type ? type.mime : 'image/jpeg';

  const body = fileFromSync(file.path, mimeType);

  const headers = {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'en-US,en;q=0.5',
    'Cache-Control': 'no-cache',
    'Content-Type': `${mimeType};charset=UTF-8`,
    'Content-Length': body.size.toString(),
    Pragma: 'no-cache',
    Connection: 'keep-alive',
    Host: 'tinypng.com',
    DNT: '1',
    Referer: 'https://tinypng.com/',
    'User-Agent':
            'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:42.0) Gecko/20100101 Firefox/42.0',
  };

  const output: Record<ApiOutputKeys, any> = {
    data: null,
    size: null,
    error: null,
  };

  try {
    const response = await fetch('https://tinypng.com/web/shrink', {
      method: 'POST',
      body,
      headers,
    });

    const result = (await response.json()) as IApiResult;

    if ('output' in result) {
      try {
        const response = await fetch(result.output.url, {
          method: 'GET',
        });

        const arrayBuffer = await response.arrayBuffer();

        output.data = Buffer.from(arrayBuffer);
        output.size = result.output.size;
      } catch (e) {
        output.error = new Error('Ошибка при получении ответа от сервера');
      }
    } else {
      output.error = new Error('Ошибка при выполнении запроса к серверу');
    }
  } catch (e) {
    if (e instanceof Error) {
      output.error = e;
    }
  }

  return output;
};
