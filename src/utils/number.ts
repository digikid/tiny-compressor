export const formatBytes = (bytes: number, digits: number = 2): string => {
  const k = 1024;
  const dm = digits < 0 ? 0 : digits;
  const sizes = ['B', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];

  if (bytes > 0) {
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
  }

  return '0 B';
};
