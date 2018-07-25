'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const livereload = require('gulp-livereload');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const runSequence = require('run-sequence');
const babel = require('gulp-babel');
const webpackStream = require('webpack-stream');
const mocha = require('gulp-mocha');
const webpack = require('webpack');
const del = require('del');

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

gulp.task('clean-js', function() {
    return del(['public/assets/js/*.js']);
});

gulp.task('build-js', ['clean-js'], function() {
    let options = { mode: 'development', output: { filename: 'bundle.js' } };
    if (gutil.env.type === 'production') {
        options.mode = 'production';
        options.output.filename = '[name].[chunkhash].js';
    }
    return gulp.src('source/client-js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(webpackStream(options, webpack))
        //only uglify if run with '--type production'
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets/js'))
        .pipe(livereload());
});

gulp.task('test', function() {
    return gulp.src(['test/*.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('source/scss/**/*.scss', ['build-css']);
    gulp.watch('source/client-js/**/*.js', ['build-js']);
    gulp.watch(['server/**', 'test/**'], ['test']);
});

gulp.task('build', function() {
    runSequence(
        'test',
        'build-css',
        'build-js'
    );
});