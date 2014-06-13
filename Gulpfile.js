var gulp  = require('gulp'),
    gutil = require('gulp-util');

gulp.task('stylus', function () {
    var stylus = require('gulp-stylus');

    return gulp.src('./assets/styl/main.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('default', ['stylus']);
