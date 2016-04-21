var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber');
    autoprefixer = require('gulp-autoprefixer');


gulp.task('css', function(){

    gulp.src("sass/main.scss")
        .pipe(plumber())
        .pipe(sass.sync())
        .pipe(autoprefixer({
            browsers: ['last 5 version', 'IE 9']
        }))
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream());

});

gulp.task('server', function(){

    browserSync.init({
        server: './'
    })

});

gulp.task("watch", function(){

    gulp.watch('sass/**/*.scss', ['css']);
    gulp.watch(['*.html', '**/*.js'], browserSync.reload);

})

gulp.task('default', ['css','server','watch']);