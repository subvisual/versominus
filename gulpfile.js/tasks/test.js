var jasmine = require('gulp-jasmine');

module.exports = function(gulp, $, config) {
  gulp.task('test', function() {
    return gulp.src('src/tests/index.js')
      .pipe(jasmine());
  });
};
