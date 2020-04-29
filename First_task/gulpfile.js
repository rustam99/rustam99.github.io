var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var babel = require('gulp-babel');
var minify = require('gulp-minify');

function css_style(done) {
	gulp.src('./assets/css/src/style.scss')
		.pipe(plumber({
			errorHandler: notify.onError(function (err) {
				return {
					title: 'Styles',
					message: err.message
				}
			})
		}))
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./assets/css/'));

	done();
}

function scripts(done) {
	gulp.src('./assets/js/src/**/*.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(minify({
			noSource: true,
		}))
		.pipe(gulp.dest('./assets/js/'));
	done();
}

function watchFiles() {
	gulp.watch('./assets/css/src/**/*.scss', css_style);
	gulp.watch('./assets/js/src/**/*.js', scripts);
}

gulp.task('default', watchFiles);
