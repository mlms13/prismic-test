// core gulp stuff
var gulp  = require('gulp'),
    gutil = require('gulp-util'),

    // plugins used by multiple tasks
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

var paths = {
    server: {
        js: ['./Gulpfile.js', './app.js', './routes/**/*.js']
    },
    client: {
        js: ['./assets/**/*.js'],
        styles: ['../assets/styl/main.styl']
    }
};

gulp.task('stylus', function () {
    var stylus = require('gulp-stylus');

    return gulp.src(paths.client.styles)
        .pipe(stylus())
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('js:client', function () {
    var uglify  = require('gulp-uglify');

    return gulp.src(paths.client.js)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('js:server', function () {
    return gulp.src(paths.server.js)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('build', ['stylus', 'js:client', 'js:server']);

gulp.task('server', ['build'], function () {
    var nodemon = require('nodemon');

    nodemon({
        script: './bin/www',
        ignore: ['.git', 'public/**', 'assets/**']
    }).on('start', function () {
        gutil.log('Nodemon has started the server.');
    });
});

// just an alias for the `gulp server` task
gulp.task('default', ['server']);
