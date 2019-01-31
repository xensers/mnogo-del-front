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
    gulp.src('app/**/*.js'),
    uglify()
  ], cb);
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('scss', function(){
    return gulp.src('app/assets/scss/*.scss')
        .pipe(plumber({errorHandler}))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('app/assets/css/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('pug', function() {
  return gulp.src('app/*.pug')
    .pipe(plumber({errorHandler}))
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('app/'))
});

gulp.task('img:build', function() {
    return gulp.src('app/assets/images/**/*')
        .pipe(plumber({errorHandler}))
        .pipe(cache(imagemin({ 
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/assets/images'));
});


gulp.task('html:build', function() {
    return gulp.src('app/*.html')
        .pipe(plumber({errorHandler}))
        .pipe(useref())
        .pipe(gulpif('*.js', uglify() ))
        .pipe(gulpif('*.css', cssnano({reduceIdents: false}) ))
        .pipe(gulp.dest('dist'));
});

gulp.task('media:build', function() {
    return gulp.src('app/assets/media/**/*.*')
        .pipe(gulp.dest('dist/assets/media'));
});

gulp.task('fonts:build', function() {
    return gulp.src('app/assets/fonts/**/*.*')
        .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('build', ['clean', 'scss', 'pug', 'fonts:build', 'img:build', 'media:build', 'html:build']);

gulp.task('watch', ['browser-sync'], function watch() {
    gulp.watch('app/assets/scss/**/*.scss', ['scss']);
    gulp.watch('app/assets/js/**/*.js', browserSync.reload);  
    gulp.watch('app/**/*.pug', ['pug']);
    gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('clean', function clean() {
    return del.sync('dist');
});

gulp.task('clear', function clear() {
    return cache.clearAll();
})

gulp.task('default', ['scss', 'pug', 'watch']);
