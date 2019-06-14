const gulp = require('gulp'),
	  imageMin = require('gulp-imagemin'),
	  del = require('del'),
	  usemin = require('gulp-usemin'),
	  rev = require('gulp-rev'),
	  cssnano = require('gulp-cssnano'),
	  gulpUglify = require('gulp-uglify'),
	  browserSync = require('browser-sync').create();


gulp.task('previewDist', ()=> {
	browserSync.init({
	  	server: {
	  		baseDir: "docs"
	  	}
	});
});


gulp.task('deleteDistFolder', ()=> {
	return del("./docs");
});


gulp.task('optimizeImages', ()=>{
	return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
	.pipe(imageMin({
		progressive: true,
		interlaced: true,
		multipass: true

	}))
	.pipe(gulp.dest('./docs/assets/images'));

});

gulp.task('usemin', ()=> {
	return gulp.src("./app/index.html")
	.pipe(usemin({
		css: [
			()=>{
				return rev()
			}, 
			()=>{
				return cssnano()
			}],
		js: [
			()=>{
				return rev()
			}, 
			()=>{
				return gulpUglify()
			}
		]
	}))
	.pipe(gulp.dest("./docs"));
})


gulp.task('build', gulp.series('deleteDistFolder', gulp.parallel('optimizeImages', 'usemin')));