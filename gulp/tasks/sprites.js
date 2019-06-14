const gulp = require('gulp'),
	  svgSprite = require('gulp-svg-sprite'),
	  rename = require('gulp-rename'),
	  del = require('del');

const config = {
	mode: {
		css: {
			sprite: 'sprite.svg',
			render: {
				css: {
					template: './gulp/templates/sprite.css'
				}
			}
		}
	}
}

function beginClean (){
	return del(['./app/temp/sprite', './app/assets/images/sprites']);
}

function createSprite (){
	return gulp.src('./app/assets/images/icons/**/*.svg')
	.pipe(svgSprite(config))
	.pipe(gulp.dest('./app/temp/sprite/'));
}

function copySpriteGraphic (){
	return gulp.src('./app/temp/sprite/css/**/*.svg')
	.pipe(gulp.dest('./app/assets/images/sprites'));
}


function copySpriteCSS () {
	return gulp.src('./app/temp/sprite/css/*.css')
	.pipe(rename('_sprite.css'))
	.pipe(gulp.dest('./app/assets/styles/modules'));
}

function endClean () {
	return del('./app/temp/sprite');
}

gulp.task('icons', gulp.series(beginClean, gulp.parallel(createSprite, copySpriteGraphic, copySpriteCSS, endClean)));

