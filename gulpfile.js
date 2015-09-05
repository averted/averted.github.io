var path      = require('path')
  , gulp      = require('gulp')
  , stylus    = require('gulp-stylus');

gulp.task('build:stylus', function() {
  return gulp.src('styles/*.styl')
    .pipe(stylus({
      errors: true,
      compress: true,
      paths: ['.', 'styles'],
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('default', function() {
  gulp.start('build:stylus');
});
