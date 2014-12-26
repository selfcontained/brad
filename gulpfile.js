var gulp = require('gulp');
var path = require('path');
var transform = require('vinyl-transform');
var through = require('through2');
var DevBundler = require('browserify-dev-bundler');
var clean = require('gulp-clean');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var imageMin = require('gulp-imagemin');

// clean up public_dist & public_dist_versioned dir
gulp.task('clean', function() {

    return gulp.src(['public_dist', 'public_dist_versioned'], { read: false })
        .pipe(clean());
});

gulp.task('browserify', ['clean'], function () {
    var root = path.join(__dirname, 'app-client');

    var bundler = DevBundler({
        watchify: false,
        root: root,
        transforms: ['jadeify'],
        addFile: function(bundle, module, modulePath) {
            console.log(module);
            bundle.require(modulePath, { expose: module });
        }
    });

    var browserified = transform(function(filename) {
        console.log('filename: ', filename);
        return bundler.createBundle(path.relative(root, filename).replace(/\.js$/,''), noop);
    });

    // rename thing/index.js files to thing.js
    var rename = through.obj(function(file, enc, cb) {
        if(path.basename(file.path) === 'index.js') {
            file.path = path.dirname(file.path)+'.js';
        }
        cb(null, file);
    });

  return gulp.src('./app-client/*/*.js')
    .pipe(rename)
    .pipe(browserified)
    .pipe(gulp.dest('./public_dist/js'));
});

// versionize all assets in public dir
gulp.task('version', ['browserify'], function() {

    return gulp.src([
            'public/**/*.*',
            'public_dist/**/*.*' // pull in compiled js/css
        ])
        .pipe(gulp.dest('public_dist_versioned')) // copy original assets as well
        .pipe(rev())
        .pipe(gulp.dest('public_dist_versioned'))
        .pipe(rev.manifest()) // write manifest.json file to disk
        .pipe(gulp.dest('.'));
});

// compress all js in public_dist_versioned w/ uglify
gulp.task('compress-js', ['version'], function() {

    return gulp.src('public_dist_versioned/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public_dist_versioned'));
});

gulp.task('compress-css', ['version'], function() {

    return gulp.src('public_dist_versioned/**/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('public_dist_versioned'));
});

// optimize images in public_dist_versioned/images
gulp.task('optimize-images', ['version'], function() {

    return gulp.src('public_dist_versioned/images/**/*.*')
        .pipe(imageMin({ progressive: true }))
        .pipe(gulp.dest('public_dist_versioned/images'));
});

gulp.task('build', ['clean', 'browserify', 'version', 'compress-js', 'compress-css', 'optimize-images']);

function noop(){}
