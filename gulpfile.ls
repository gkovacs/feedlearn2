require! {
  \gulp
  \gulp-livescript
  \gulp-nodemon
  \gulp-stylus
  \nib
  \gulp-shell
  \gulp-jade
}

gulp.task 'ls', ->
  return gulp.src ['*.ls', '!gulpfile.ls', '!*.json.ls']
  .pipe gulp-livescript({bare: false})
  .pipe gulp.dest('.')

gulp.task 'lsjson', ->
  return gulp.src(['*.json.ls'], {read: false})
  .pipe gulp-shell(['lsc -c <%= file.path %>'])

gulp.task 'stylus', ->
  return gulp.src '*.stylus'
  .pipe gulp-stylus({use: nib()})
  .pipe gulp.dest('.')

gulp.task 'jade', ->
  return gulp.src '*.jade'
  .pipe gulp-jade({pretty: true})
  .pipe gulp.dest('.')

gulp.task 'build', ['ls', 'lsjson', 'stylus', 'jade']

gulp.task 'watch', ->
  gulp.watch ['*.ls', '!gulpfile.ls', '*.stylus', '*.jade'], ['build']

gulp.task 'develop', ->
  gulp-nodemon {script: 'app.js', ext: 'jade ls stylus'}
  .on 'restart', ['build']

gulp.task 'default', ['build', 'develop']