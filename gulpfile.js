const gulp = require('gulp');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');
const tap = require('gulp-tap');
const buffer = require('gulp-buffer');
const browserify = require('browserify');
const minify = require('gulp-minify');

const configPath = {
  'build': {
    'js': './app/public/assets/js/**/*.js',
    'js_main': './app/public/assets/js/main.js'
  },
  'output': {
    'js': './dist/assets/js',
    'js_minify': './dist/assets/js/main.js'
  }
};

gulp.task('dist::js', () => {
  gulp.src(configPath.build.js_main)
    .pipe(plumber( (err) => {
      gutil.log(err.message);
      this.emit('end');
    }))
    .pipe(tap( (file) => {
      file.contents =
        browserify(file.path)
        .bundle()
        .on('error', (err) => {
          gutil.log(err.stack);
          this.emit('end');
        });
    }))
    .pipe(buffer())
    .pipe(gulp.dest(configPath.output.js));
});

gulp.task('dist::js:uglify', () => {
  gulp.src(configPath.output.js_minify)
    .pipe(minify())
    .pipe(gulp.dest(configPath.output.js));
});

gulp.task('default', ['dist::js', 'dist::js:uglify']);