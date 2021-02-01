module.exports = (gulp, plugins, config) => {
    return done => {
        const watchers = [{
            name: `compress`,
            path: `${config.paths.original}/**`,
            tasks: [`compress`]
        }];
        watchers.forEach(watcher => gulp.watch(watcher.path, gulp.series(...watcher.tasks)));
    };
};