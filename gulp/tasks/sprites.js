var gulp = require('gulp'),
	  svgSprite = require('gulp-svg-sprite'),
	  rename = require('gulp-rename'),
	  del = require('del'),
	  svg2png = require('gulp-svg2png');

var config = {
	shape: {
		spacing: {
			padding: 1
		}
	},
	mode: {
		css: {
			variables: {
				replaceSvgWithPng: ()=>{
					return (sprite, render)=> {
						return render(sprite).split('.svg').join('.png');
					}
				}
			},
			sprite: 'sprite.svg',
			render: {
				css: {
					template: './gulp/templates/sprite.css'
				}
			}
		}
	}
}

gulp.task('beginClean', function(){
	return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

gulp.task('createSprite', function(){
 	return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('createPngCopy', function() {
	return gulp.src('./app/temp/sprite/css/*.svg')
	.pipe(svg2png())
	.pipe(gulp.dest('./app/temp/sprite/css'));
});


gulp.task('copySpriteGraphic', function(){
	return gulp.src('./app/temp/sprite/css/**/*.{svg, png}')
	.pipe(gulp.dest('./app/assets/images/sprites'));
});


gulp.task('copySpriteCSS', function(){
	return gulp.src('./app/temp/sprite/css/*.css')
	.pipe(rename('_sprite.css'))
	.pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean', gulp.series('createSprite', gulp.parallel('copySpriteGraphic', 'copySpriteCSS')), function(){
	return del('./app/temp/sprite');
});

gulp.task('icons', gulp.series('beginClean', gulp.parallel('createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean')));
