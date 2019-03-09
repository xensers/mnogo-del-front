var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var cache        = require('gulp-cache');
var rename       = require('gulp-rename');
var del          = require('del');

var pug          = require('gulp-pug');
var useref       = require('gulp-useref');
var gulpif       = require('gulp-if');

var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var cssnano      = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');

var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var babel        = require('gulp-babel');

var imagemin     = require('gulp-imagemin');
var pngquant     = require('imagemin-pngquant');

var plumber      = require('gulp-plumber');
var notify       = require('gulp-notify');
var pump         = require('pump');

var errorHandler = notify.onError('<%= error.message %>');

gulp.task('debuggingUglify', function (cb) {
  pump([
    gulp.src('src/**/*.js'),
    uglify()
  ], cb);
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        notify: false
    });
});

gulp.task('scss', function(){
    return gulp.src('src/scss/*.scss')
        .pipe(plumber({errorHandler}))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('dist/css/'))
        .pipe(sourcemaps.write())
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('pug', function() {
  return gulp.src('src/*.pug')
    .pipe(plumber({errorHandler}))
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('dist/'))
});

gulp.task('img', function() {
    return gulp.src('src/images/**/*')
        .pipe(plumber({errorHandler}))
        .pipe(cache(imagemin({ 
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('js', function () {
    gulp.src('src/scripts/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(reload({stream: true}));
});

gulp.task('scripts', function() {
   gulp.src(['src/scripts/main/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/scripts/'));

   gulp.src(['src/scripts/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts/'));
});

gulp.task('libs', function() {
  gulp.src(['src/libs/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/scripts/'));
});

gulp.task('media', function() {
    return gulp.src('src/media/**/*.*')
        .pipe(gulp.dest('dist/media'));
});

gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('build', ['clean', 'scss', 'pug', 'scripts', 'libs', 'fonts', 'img', 'media']);

gulp.task('watch', ['browser-sync'], function watch() {
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('src/**/*.pug', ['pug']);
    gulp.watch('src/images/**/*', ['img']);
    gulp.watch('src/media/**/*.*', ['media']);
    gulp.watch('src/fonts/**/*.*', ['fonts']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('dist/scripts/**/*.js', browserSync.reload);
    gulp.watch('dist/*.html', browserSync.reload);
});

gulp.task('clean', function clean() {
    return del.sync('dist');
});

gulp.task('clear', function clear() {
    return cache.clearAll();
})

gulp.task('default', ['build', 'watch']);
