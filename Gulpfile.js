var gulp  = require('gulp'),
    gutil = require('gulp-util');

gulp.task('stylus', function () {
    var stylus = require('gulp-stylus');

    return gulp.src('./assets/styl/main.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('js', function () {
    var uglify  = require('gulp-uglify'),
        jshint  = require('gulp-jshint'),
        stylish = require('jshint-stylish');

    return gulp.src('./assets/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('default', ['stylus', 'js']);
