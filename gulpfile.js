'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var plumber = require('gulp-plumber');
var duration = require('gulp-plumber');

var DEST = 'build/';

gulp.task('default', function() {
  return gulp.src(['src/ng-flux.js', 'src/**/*.js'])
    .pipe(plumber())
    .pipe(concat('ngFlux.js'))
    .pipe(ngAnnotate())
    .pipe(sourcemaps.write())
    // This will output the non-minified version
    .pipe(gulp.dest(DEST))
    // This will minify and rename to *.min.js
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(duration('Building files...'))
    .pipe(gulp.dest(DEST));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['default']);
});