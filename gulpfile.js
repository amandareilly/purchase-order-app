'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const livereload = require('gulp-livereload');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const addsrc = require('gulp-add-src');
const runSequence = require('run-sequence');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');

gulp.task('default', ['watch']);

gulp.task('build-css', function() {
    return gulp.src('source/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        //only minify if run with '--type production'
        .pipe(gutil.env.type === 'production' ? cssnano() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets/css'))
        .pipe(livereload());
});

gulp.task('build-js', function() {
    return gulp.src('source/client-js/*.js')
        .pipe(sourcemaps.init())
        // .pipe(concat('bundle.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(webpack())
        //only uglify if run with '--type production'
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets/js'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('source/scss/**/*.scss', ['build-css']);
    gulp.watch('source/js/**/*.js', ['build-js']);
});

gulp.task('build', function() {
    runSequence(
        'build-css',
        'build-js'
    );
});