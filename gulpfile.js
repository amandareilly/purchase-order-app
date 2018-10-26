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
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const merge = require('merge-stream');
const concat = require('gulp-concat');
const order = require('gulp-order');

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

gulp.task('compile-templates', function() {
    //process and register partials
    //assume that all partials start with an underscore
    const partials = gulp.src('source/templates/**/_*.hbs')
        .pipe(handlebars())
        .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
            imports: {
                processPartialName: function(fileName) {
                    // Strip the extension and underscore
                    // Escape the output with JSON.stringify
                    const fileArr = fileName.split('\\');
                    let name = '';
                    for (let i = 0; i < fileArr.length; i++) {
                        if (i !== fileArr.length - 1) {
                            name += fileArr[i] + '_';
                        } else {
                            name += fileArr[i].slice(1, -3);
                        }
                    }
                    return JSON.stringify(name);

                }
            }
        }));
    const templates = gulp.src('public/views/**/[^_]*.hbs')
        .pipe(handlebars())
        .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
            imports: {
                processPartialName: function(fileName) {
                    // Strip the extension and underscore
                    // Escape the output with JSON.stringify
                    const fileArr = fileName.split('\\');
                    let name = '';
                    for (let i = 0; i < fileArr.length; i++) {
                        if (i !== fileArr.length - 1) {
                            name += fileArr[i] + '_';
                        } else {
                            name += fileArr[i].slice(0, -3);
                        }
                    }
                    return JSON.stringify(name);

                }
            }
        }))
        .pipe(declare({
            namespace: 'templates',
            noRedeclare: true // Avoid duplicate declarations
        }));

    //output both the partials and the templates as client-js/templates.js
    return merge(partials, templates)
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('source/client-js/templates'));

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

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('public/views/**/*.hbs', ['compile-templates']);
    gulp.watch('source/scss/**/*.scss', ['build-css']);
    gulp.watch('source/client-js/**/*.js', ['build-js']);
});

gulp.task('build', function() {
    runSequence(
        'build-css',
        'compile-templates',
        'build-js'
    );
});