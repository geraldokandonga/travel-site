const gulp = require('gulp'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync').create();


gulp.task('watch', () => {

  browserSync.init({
  	server: {
  		baseDir: "app"
  	}
  });

  watch('./app/index.html', ()=>{
  	 browserSync.reload();
  });
  
  watch('./app/assets/styles/**/*.css')
   .on('change', gulp.series('cssInject'));

  watch('./app/assets/scripts/**/*.js')
   .on('change', gulp.series('scriptsRefresh'));

});


gulp.task('cssInject', gulp.series('styles'), ()=> {
	return gulp.src('./app/temp/styles/styles.css')
	.pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', gulp.series('scripts'), ()=> {
  browserSync.reload();
});