'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var DEST = 'build/';

gulp.task('default', function() {
  return gulp.src('src/**/*.js')
    .pipe(concat('ngFlux.js'))
    .pipe(sourcemaps.write())
    // This will output the non-minified version
    .pipe(gulp.dest(DEST))
    // This will minify and rename to *.min.js
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(DEST));
});