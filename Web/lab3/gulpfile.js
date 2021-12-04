const gulp = require("gulp4");
const uglify = require('gulp-uglify');
const rename = require("gulp-rename"); // Source Maps
const babel = require('gulp-babel');
const concat = require('gulp-concat');

scripts = () => {
    return gulp.src(['public/src/*.js'])
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(rename({
            'basename': 'main',
            'suffix': '.min'
        }))
        .pipe(gulp.dest('./public/src'))

};

gulp.task("default", gulp.series( scripts));