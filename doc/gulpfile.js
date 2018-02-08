var gulp = require('gulp');
var aglio = require('gulp-aglio');
gulp.task('docs', function () {
  gulp.src('_docs/*.md')
      .pipe(aglio({ template: 'default' }))
      .pipe(gulp.dest('docs'));
});