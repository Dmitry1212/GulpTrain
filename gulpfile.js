var gulp = require('gulp'),
    sass = require('gulp-sass'),//Подключаем Sass пакет
    concat = require('gulp-concat'),
    del         = require('del');
    uglify      = require('gulp-uglifyjs'); // Подключаем gulp-uglifyjs (для сжатия JS);
const   imagemin = require('gulp-imagemin');


gulp.task('mytask', function () {
    console.log('Gulp запущен');
});

gulp.task('sass', function () { // Создаем таск "sass"
    return gulp.src('app/sass/*.sass')  // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
});

gulp.task('imageTask', function () {
    gulp.src('app/img/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('dist/img'))
});

gulp.task('concatCSS', function() {
    return gulp.src(['app/css/*.css'])
        .pipe(concat('style.css'))
        .pipe(gulp.dest('app/css'));
});

gulp.task('concatJS', function() {
    return gulp.src(['app/js/*.js'])
        .pipe(concat('js.js'))
        .pipe(gulp.dest('app/js'));
});

gulp.task('scripts', function() {
    return gulp.src([ 'app/js/*.js', '!js.min.js' ])
        .pipe(concat('js.min.js'))
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js'));
});

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('build', ['sass', 'imageTask', 'concatCSS', 'scripts'], function() {

    var buildCss = gulp.src([ // Переносим CSS стили в продакшен
        'app/css/style.css'
    ])
        .pipe(gulp.dest('dist/css'))

    var buildJs = gulp.src('app/js/js.min.js') // Переносим скрипты в продакшен
        .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));
});

gulp.task('clear', function () {
    return cache.clearAll();
})


