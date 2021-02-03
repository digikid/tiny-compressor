const { promises: fs } = require(`fs`);

module.exports = (gulp, plugins, config) => {
    return done => {
        gulp.src(`${config.paths.original}/**/*.{jpg,jpeg,png}`)
            .pipe(plugins.changed(config.paths.compressed))
            .pipe(plugins.plumber())
            .pipe(plugins.tinypngFree())
            .pipe(gulp.dest(config.paths.compressed))
            .on(`end`, done);
    };
};
