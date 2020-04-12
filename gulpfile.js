// =======================
// Используемые npm-пакеты
// Общие
// =======================
const gulp = require('gulp');
const rename = require('gulp-rename');

const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const concatCss = require('gulp-concat-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');


// ==========
// Base tasks
// ==========

// Build css styles
gulp.task('css', () => {
  return gulp.src(['./css/*.css','!./css/*.min.css'])
    .pipe(autoprefixer('>1% and last 2 versions and not IE 11'))
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css/'));
});

// Build css styles
gulp.task('css_all', () => {
  return gulp.src(['./css/default.css','./css/main.css'])
    .pipe(autoprefixer('>1% and last 2 versions and not IE 11'))
    .pipe(concatCss('all.css'))
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css/'));
});

// Build scripts
gulp.task('js', () => {
  return gulp.src(['./js/*.js','!./js/*.min.js','!./js/multimedia.js'])
    .pipe(babel({
      presets: [
        ['@babel/env', {
          modules: false
        }]
      ]
    }))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js'));
});

// ==========
// Composed tasks
// ==========
gulp.task('build', gulp.series( 'css', 'js'));
