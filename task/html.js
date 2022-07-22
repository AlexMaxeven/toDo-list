const { src, dest } = require ("gulp");

// Конфигурация
const path = require("../config/path.js");
const app  = require("../config/app.js");

// Plagins
const plumber     = require ("gulp-plumber");
const notify      = require ("gulp-notify");
const fileInclude = require ("gulp-file-include");
const htmlmin     = require ("gulp-htmlmin");
const size        = require ("gulp-size");

// Обработка html
const html = () => {
    return  src(path.html.src)
        .pipe(plumber({
            errorHandler:notify.onError()
        }))
        .pipe(fileInclude())
        .pipe(size({ title: "До сжатия" }))
        .pipe(htmlmin(app.htmlmin))
        .pipe(size({ title: "После сжатия" }))
        .pipe(dest(path.html.dest));
}

module.exports = html;