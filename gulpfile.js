const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const browserSync = require('browser-sync').create();


function styles() {
	return gulp.src('./less/**/*.less')
			   .pipe(concat('index.less'))
			   .pipe(less())
			   .pipe(autoprefixer({
		             browsers: ['last 2 versions'],
		             cascade: false
		         }))
			    .pipe(cleanCSS({
			    		level: 2
			    }))
			   .pipe(gulp.dest('./css'))
			   .pipe(browserSync.stream());
}

function watch() {
	browserSync.init({
        server: {
            baseDir: "./"
        },
        tunnel: true
    });
	gulp.watch('./less/**/*.less', styles);
	gulp.watch('./*.html', browserSync.reload);
	gulp.watch('./less/**/*.less', browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('watch', watch);