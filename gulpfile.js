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
const declare = require('gulp-declare');
const merge = require('merge-stream');
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const log = require('gulp-util').log;
const addsrc = require('gulp-add-src');
const runSequence = require('run-sequence');
const babel = require('gulp-babel');

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
    const templates = gulp.src('source/templates/**/[^_]*.hbs')
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'templates',
            noRedeclare: true // Avoid duplicate declarations
        }));

    //output both the partials and the templates as js/templates.js
    return merge(partials, templates)
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('source/js/client/templates'));

});

gulp.task('build-js', function() {
    return gulp.src('source/js/client/classes/*.js')
        .pipe(addsrc.append('source/js/client/templates/*.js'))
        .pipe(addsrc.append('source/js/client/*.js'))
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(babel({
            presets: ['env']
        }))
        //only uglify if run with '--type production'
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets/js'))
        .pipe(livereload());
});

gulp.task('copy-server-js', function() {
    return gulp.src('source/js/server/*.js')
        .pipe(sourcemaps.init())
        //only uglify if run with '--type production'
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets/js/server'))
        .pipe(livereload());
})

gulp.task('copy-html', function() {
    gulp.src('source/*.html').pipe(gulp.dest('public'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('source/templates/**/*.hbs', ['compile-templates']);
    gulp.watch('source/*.html', ['copy-html']);
    gulp.watch('source/scss/**/*.scss', ['build-css']);
    gulp.watch('source/js/**/*.js', ['build-js']);
});

gulp.task('build', function() {
    runSequence(
        ['build-css', 'compile-templates', 'copy-html', 'copy-server-js'],
        'build-js'
    );
});