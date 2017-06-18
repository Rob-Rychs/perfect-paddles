'use strict';
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoReload = require('gulp-auto-reload');

var htmlInject = function () {
  return gutil.noop();
};

gulp.task('html', function () {
  gulp.src('./mobile-index.html')
    .pipe(htmlInject())
    .pipe(gulp.dest('dist'));
});

gulp.task('reloader', function () {
  // start a server for reloading 
  var reloader = autoReload();
  // copy the auto-reload.js script to 
  // the output 
  reloader.script()
    .pipe(gulp.dest('dist'));
  // inject the script into html pages 
  htmlInject = reloader.inject;
  // start watching the output for changes 
  gulp.watch('dist' + "/**/*", reloader.onChange);
});


// gulp.task('default', () =>
//   gulp.src('./sass/mobile.scss')
//   .pipe(sourcemaps.init())
//   .pipe(sass.sync().on('error', sass.logError))
//   .pipe(autoprefixer({
//     browsers: ['last 2 versions'],
//     cascade: false
//   }))
//   .pipe(sourcemaps.write())
//   .pipe(gulp.dest('dist'))
// );

// building html/css causes no <script> injection 
gulp.task('default', ['html', 'sass']);

gulp.task('sass', () =>
  gulp.src('./sass/mobile.scss')
  .pipe(sourcemaps.init())
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist'))
);
//  'saas' 
// gulp.task('watch', function () {
//   gulp.watch('./sass/*.scss', ['default']);
// });

// 'reloader' sets htmlInject, and 'html' task will 
// make injected html page 
gulp.task('watch', ['reloader', 'html'], function() {
  // watch all source for rebuild 
  gulp.watch(['mobile-index.html', './sass/*.scs'], ['default']);
});