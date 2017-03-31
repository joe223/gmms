var gulp = require('gulp');
var minify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');

gulp.task('leaflet', function () {
    var task = gulp.src('dist/js/plugins/leaflet/*.js')
        // .pipe(minify())
        .pipe(concat('bundle-leaflet.min.js'))
        .pipe(gulp.dest('build/'));
    return task;
});

gulp.task('data', function () {
    // 将你的默认的任务代码放在这
    var task = gulp.src('dist/js/data/*.js')
        // .pipe(minify())
        .pipe(concat('bundle-data.min.js'))
        .pipe(gulp.dest('build/'));
    return task;
});

gulp.task('actions', function () {
    // 将你的默认的任务代码放在这
    var task = gulp.src('dist/js/actions/*.js')
        // .pipe(minify())
        .pipe(concat('bundle-actions.min.js'))
        .pipe(gulp.dest('build/'));
    return task;
});

gulp.task('css', function () {
    var task = gulp.src('dist/css/*.css')
        .pipe(concat('style.min.css'))    
        // .pipe(cleanCSS({
        //     compatibility: 'ie8',
        //     debug: true
        // }, function (details) {
        //     console.log(details.name + ': ' + details.stats.originalSize);
        //     console.log(details.name + ': ' + details.stats.minifiedSize);
        // }))
        .pipe(gulp.dest('build/'));

    return task;
});

gulp.task('default', ['leaflet', 'data', 'actions', 'css']);