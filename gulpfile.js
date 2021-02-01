const dree = require(`dree`);
const gulp = require(`gulp`);
const plugins = require(`gulp-load-plugins`)();
const config = require(`./config`);

const tasks = dree.scan(`./gulp/`).children.filter(task => task.extension === `js`).map(task => task.name.replace(`.js`, ``));

tasks.forEach(task => {
    gulp.task(task, require(`./gulp/` + task)(gulp, plugins, config));
});

gulp.task(`default`, gulp.series(...tasks));