var gulp = require('gulp')
var edit = require('gulp-edit')
var eol = require('gulp-eol')
var less = require('gulp-less')
var install = require('gulp-install')

gulp.task('install', function(){
  return gulp.src([
    'package.json',
    'bower.json'
  ]).pipe(install())
})

gulp.task('lib', function(){
  return gulp.src([
    'bower_components/jquery/dist/jquery.min.js'
  ]).pipe(gulp.dest('dist'))
})

gulp.task('wrap', function(){
  return gulp.src('src/popup.js')
    .pipe(edit(function(src, cb){
      cb(null, [
        ';(function(){\n',
        src,
        '\n})();\n'
      ].join('\n'))
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('less', function(){
  return gulp.src('src/popup.less')
    .pipe(less())
    .pipe(gulp.dest('dist'))
})

gulp.task('eol', function(){
  return gulp.src([
    '**/*.{js,less,css,html}',
    '**/.*',
    '!bower_components/**',
    '!node_modules/**'
  ]).pipe(eol('\n'))
  .pipe(gulp.dest('.'))
})

gulp.task('watch', function(){
  gulp.watch('src/**/*.less', ['less', 'eol'])
  gulp.watch('src/**/*.js', ['wrap'])
})

gulp.task('setup', ['install', 'lib'])
gulp.task('build', ['wrap', 'less', 'eol'])
gulp.task('default', ['build', 'watch'])
