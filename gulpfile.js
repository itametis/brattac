// Import :
var gulp = require('gulp');
var concat = require('gulp-concat');
var karma = require('karma');

// Folders :
var SRC_DIR = "./src/main/js";
var TARGET_DIR = "./target";
var MINIFIED_FILES_DIR = TARGET_DIR + "/minified";
;
var MERGED_FILES_DIR = TARGET_DIR + "/merged";


/**
 * Cleans the target directory.
 */
gulp.task('clean', function() {
    var clean = require('gulp-clean');
    return gulp.src('target', {read: false}).pipe(clean());
});


/**
 * Merges Brattac files into (has to be in this order) :
 * - brattac-dom
 * - brattac-api
 * - brattac-oop
 */
gulp.task('merge', function() {
    // Concatenate Brattac DOM :
    gulp.src([SRC_DIR + '/brattac-dom.js'])
        .pipe(concat('brattac-dom.js'))
        .pipe(gulp.dest(MERGED_FILES_DIR));

    // Concatenate Brattac LOG :
    gulp.src([SRC_DIR + '/brattac-header.js', SRC_DIR + '/brattac-logger.js'])
        .pipe(concat('brattac-log.js'))
        .pipe(gulp.dest(MERGED_FILES_DIR));

    // Concatenate Brattac API :
    gulp.src([SRC_DIR + '/brattac-header.js', SRC_DIR + '/brattac-api.js'])
        .pipe(concat('brattac-api.js'))
        .pipe(gulp.dest(MERGED_FILES_DIR));

    // Concatenate Brattac AJAX :
    gulp.src([MERGED_FILES_DIR + '/brattac-api.js', SRC_DIR + '/brattac-ajax.js'])
        .pipe(concat('brattac-ajax.js'))
        .pipe(gulp.dest(MERGED_FILES_DIR));

    // Concatenate Brattac REST :
    gulp.src([MERGED_FILES_DIR + '/brattac-ajax.js', SRC_DIR + '/brattac-rest.js'])
        .pipe(concat('brattac-rest.js'))
        .pipe(gulp.dest(MERGED_FILES_DIR));

    // Concatenate Brattac OOP :
    gulp.src([SRC_DIR + '/brattac-header.js', SRC_DIR + '/brattac-oop.js'])
        .pipe(concat('brattac-oop.js'))
        .pipe(gulp.dest(MERGED_FILES_DIR));

    // Concatenate all files together (brattac-header is useless when brattac-dom is included) :
    return gulp.src([
        SRC_DIR + '/brattac-dom.js',
        SRC_DIR + '/brattac-api.js',
        SRC_DIR + '/brattac-log.js',
        SRC_DIR + '/brattac-ajax.js',
        SRC_DIR + '/brattac-rest.js',
        SRC_DIR + '/brattac-oop.js'
    ]).pipe(concat('brattac-all.js'))
        .pipe(gulp.dest(MERGED_FILES_DIR));
});


/**
 * Processes the transpilation of TypeScript sources to JavaScript.
 */
gulp.task('run-merge', ["merge"], function() {
    gulp.watch(SRC_DIR + '/*.js', ["merge"]);
});


/**
 * Executes the tests. Depends of 'compile' goal.
 */
gulp.task('test', ["merge"], function() {
    new karma.Server(
        {configFile: __dirname + '/karma.conf.js'}
    ).start(function(exitCode) {
        process.exit(exitCode);
    });
});


/**
 * Minify all the merged files.
 */
gulp.task('package', ["test"], function(cb) {
    var uglify = require('gulp-uglify');

    var filesToUglify = [
        MERGED_FILES_DIR + '/brattac-all.js',
        MERGED_FILES_DIR + '/brattac-dom.js',
        MERGED_FILES_DIR + '/brattac-api.js',
        MERGED_FILES_DIR + '/brattac-ajax.js',
        MERGED_FILES_DIR + '/brattac-log.js',
        MERGED_FILES_DIR + '/brattac-oop.js'
    ];

    var file;
    for (var i = 0; i < filesToUglify.length; i++) {
        file = filesToUglify[i];
        gulp.src(file)
            .pipe(uglify())
            .pipe(gulp.dest(MINIFIED_FILES_DIR));
    }
});


/**
 * Executes the continuous testing mode.
 */
gulp.task('devmod', ["run-merge"], function() {
    new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }).start(function(exitCode) {
        process.exit(exitCode);
    });
});


/**
 * Release the project.
 */
gulp.task('release', function() {
    var releaser = require('gulp-release-it');
    releaser(gulp);
});
