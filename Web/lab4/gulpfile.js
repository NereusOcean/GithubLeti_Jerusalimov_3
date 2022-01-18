const gulp = require("gulp4");
const uglify = require('gulp-uglify-es').default;
const rename = require("gulp-rename"); // Source Maps
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

scripts = () => {
    return gulp.src(['public/src/*.js'])
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(rename({
            'basename': 'main',
            'suffix': '.min'
        }))
        .pipe(gulp.dest('./public/src/'))


};

gulp.task("default", gulp.series( scripts));