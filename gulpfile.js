var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var del = require('del');
const runSequence = require('run-sequence');

gulp.task('clean', function() {
	del.sync(['dist']);
});

gulp.task('styles', function() {
    gulp.src('app/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('scripts', function() {
    return browserify('./app/js/main.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('copy', function() {
	gulp.src(['app/*.html', 'app/img/*'], { base: './app/'})
		.pipe(gulp.dest('dist'));
});

gulp.task('build', function() {
	runSequence(['clean'], ['styles', 'scripts', 'copy'], function() {
		console.log('Complete');
	});
})

gulp.task('default',function() {
	runSequence(['clean'], ['styles', 'scripts', 'copy']);
    gulp.watch('app/*',['styles']);
});