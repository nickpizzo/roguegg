///////////////////
// REQUIRED MODULES
///////////////////

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var prefix = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

///////////////////////////
// HTML CSS & SCRIPTS TASKS
///////////////////////////

const sync = browserSync.create();

gulp.task('html', () => {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(sync.reload({
      stream: true
    }));
});

gulp.task('scripts', () => {
  gulp.src('src/*.js')
    .pipe(gulp.dest('dist'))
    .pipe(sync.reload({
      stream: true
    }));
});

gulp.task('styles', function () {
  gulp.src('src/*.{scss,less,sass}')
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(prefix('last 2 versions')) //calls autoprefixer
    .pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'))
    .pipe(sync.reload({
    stream: true
  }));
});

gulp.task('images', function () {
  gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
    .pipe(sync.reload({
    stream: true
  }));
});

////////////////////////////////////////////////////
//PIPES SRC FILES INTO DIST & WATCHES CHANGES IN SRC
///////////////////////////////////////////////////

gulp.task('build', ['html', 'scripts', 'styles', 'images']);

gulp.task('serve', ['build'], function () {
  sync.init({
    server: 'dist',
  });

  gulp.watch('src/*.{html,jade}', ['html']);
  gulp.watch('src/*.js', ['scripts']);
  gulp.watch('src/*.{css,scss,sass}', ['styles']);
  gulp.watch('src/img/*.{svg, png, jpg}', ['images']);
});

//////////////////////////////
// THE DEFAULT TASK IS "SERVE"
//////////////////////////////

gulp.task('default', ['serve']);
