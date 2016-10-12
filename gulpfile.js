var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('browserify', function() {
  return gulp.
    src('./scripts/main.js').
    pipe(browserify()).
    pipe(gulp.dest('./bin'));
});

gulp.task('watch', function() {
  gulp.watch(['./scripts/*.js',
            './scripts/patterns/observer/*.js',
            './scripts/patterns/singleton/*.js'],
             ['browserify']);
});
