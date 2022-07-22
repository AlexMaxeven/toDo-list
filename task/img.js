const { src, dest } = require ("gulp");

// Конфигурация
const path = require("../config/path.js");
const app  = require("../config/app.js");

// Plagins
const plumber      = require ("gulp-plumber");
const notify       = require ("gulp-notify");
const imagemin     = require ("gulp-imagemin");
const newer        = require ("gulp-newer");
const gulpif       = require ("gulp-if");


// Обработка IMG
const img = () => {
    return  src(path.img.src)
        .pipe(plumber({
            errorHandler:notify.onError()
        }))
        .pipe(newer(path.img.dest))
        .pipe(gulpif(app.isProd, imagemin(app.imagemin)))
        .pipe(dest(path.img.dest));
}



module.exports = img;