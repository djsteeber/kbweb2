// Node modules
var fs = require('fs'), vm = require('vm'), merge = require('deeply'), chalk = require('chalk'), es = require('event-stream');

// Gulp and plugins
var gulp = require('gulp'), rjs = require('gulp-requirejs-bundler'), concat = require('gulp-concat'), clean = require('gulp-clean'),
    replace = require('gulp-replace'), uglify = require('gulp-uglify'), htmlreplace = require('gulp-html-replace');

// Config
var requireJsRuntimeConfig = vm.runInNewContext(fs.readFileSync('src/app/require.config.js') + '; require;');
    requireJsOptimizerConfig = merge(requireJsRuntimeConfig, {
        out: 'scripts.js',
        baseUrl: './src',
        name: 'app/startup',
        paths: {
            requireLib: 'bower_modules/requirejs/require'
        },
        include: [
            'requireLib',
            'components/nav-bar/nav-bar',
            'components/event-grid/event-grid',
            'components/upcoming-events/upcoming-events',
            'components/announcements/announcements',
            'components/home-page/home-page',
            'components/data-objects/announcement-do.js',
            'components/data-objects/club-event-do.js',
            'components/data-objects/schedule-do.js',
            'components/data-objects/shoot-do.js'
        ],
        insertRequire: ['app/startup'],
        bundles: {
            'about-stuff': ['components/about-page/about-page', 'components/club-board/club-board'],
            'benefit-stuff': ['text!components/benefit-page/benefit.html'],
            'lessons-stuff': ['components/lessons-page/lessons-page'],
            'events-stuff': ['components/events-page/events-page'],
            'membership-stuff': ['components/membership-page/membership-page'],
            'directions-stuff': ['text!components/directions-page/directions-page.html'],
            'members-stuff': ['components/membership-page/membership-page', 'components/message-center-page/message-center-page'],
            'club-event-stuff': ['components/club-event/club-event'],
            'shoot-page-stuff': ['components/shoot-page/shoot-page']
            // If you want parts of the site to load on demand, remove them from the 'include' list
            // above, and group them into bundles here.
            // 'bundle-name': [ 'some/module', 'another/module' ],
            // 'another-bundle-name': [ 'yet-another-module' ]
        }
    });

// Discovers all AMD dependencies, concatenates together all required .js files, minifies them
gulp.task('js', function () {
    return rjs(requireJsOptimizerConfig)
        .pipe(uglify({ preserveComments: 'some' }))
        .pipe(gulp.dest('./dist/'));
});

// Concatenates CSS files, rewrites relative paths to Bootstrap fonts, copies Bootstrap fonts
gulp.task('css', function () {
    var bowerCss = gulp.src('src/bower_modules/components-bootstrap/css/bootstrap.min.css')
            .pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/')),
        appCss = gulp.src('src/css/*.css'),
        combinedCss = es.concat(bowerCss, appCss).pipe(concat('css.css')),
        fontFiles = gulp.src('./src/bower_modules/components-bootstrap/fonts/*', { base: './src/bower_modules/components-bootstrap/' });
    return es.concat(combinedCss, fontFiles)
        .pipe(gulp.dest('./dist/'));
});

// Copies index.html, replacing <script> and <link> tags to reference production URLs
gulp.task('html', function() {
    return gulp.src('./src/index.html')
        .pipe(htmlreplace({
            'css': 'css.css',
            'js': 'scripts.js'
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('copy-static', function() {
    gulp.src('./src/img/*.*')
        .pipe(gulp.dest('./dist/img/'));
    gulp.src('./src/misc_docs/*.*')
        .pipe(gulp.dest('./dist/misc_docs/'));
});

// Removes all files from ./dist/
gulp.task('clean', function() {
    return gulp.src('./dist/**/*', { read: false })
        .pipe(clean());
});

gulp.task('default', ['html', 'js', 'css', 'copy-static'], function(callback) {
    callback();
    console.log('\nPlaced optimized files in ' + chalk.magenta('dist/\n'));
});
