const gulp = require('gulp'),
	postcss = require('gulp-postcss'),
	autoPrefixer = require('autoprefixer'),
	cssvars = require('postcss-simple-vars'),
	nested = require('postcss-nested'),
	cssImport = require('postcss-import'),
	mixins = require('postcss-mixins'),
	hexrgba = require('postcss-hexrgba');

gulp.task('styles', () => {
	return gulp.src('./app/assets/styles/styles.css')
	.pipe(postcss([cssImport, mixins, cssvars, nested,  hexrgba, autoPrefixer]))
	.on('error', (err) =>{
		console.log(err.toString());
		this.emit('end');
	})
	.pipe(gulp.dest('./app/temp/styles'));
});