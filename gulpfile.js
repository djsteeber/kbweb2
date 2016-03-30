// Node modules
var fs = require('fs'),
    vm = require('vm'),
    merge = require('deeply'),
    chalk = require('chalk'),
    async = require('async'),
    es = require('event-stream');

// Gulp and plugins
var gulp = require('gulp'),
    rjs = require('gulp-requirejs-bundler'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    replace = require('gulp-replace'),
    uglify = require('gulp-uglify'),
    htmlreplace = require('gulp-html-replace');

var SSH_CONFIG = {
    host: 'new.kenoshabowmen.com',
    port: 22,
    username: 'kbweb',
    privateKey: fs.readFileSync(process.env["HOME"] + '/.ssh/id_rsa')
};

//TODO: read the tinymce plugins from a directory scan

// Config
var requireJsRuntimeConfig = vm.runInNewContext(fs.readFileSync('src/app/require.config.js') + '; require;');
    requireJsOptimizerConfig = merge(requireJsRuntimeConfig, {
        out: 'scripts.js',
        baseUrl: './src',
        name: 'app/startup',
        paths: {
            requireLib: 'bower_modules/requirejs/require',
            "tinymce-themes":       "bower_modules/tinymce/themes/modern/theme",
            "tinymce-advlist":      "bower_modules/tinymce/plugins/advlist/plugin",
            "tinymce-autolink":     "bower_modules/tinymce/plugins/autolink/plugin",
            "tinymce-lists":        "bower_modules/tinymce/plugins/lists/plugin",
            "tinymce-link":         "bower_modules/tinymce/plugins/link/plugin",
            "tinymce-image":        "bower_modules/tinymce/plugins/image/plugin",
            "tinymce-charmap":      "bower_modules/tinymce/plugins/charmap/plugin",
            "tinymce-preview":      "bower_modules/tinymce/plugins/preview/plugin",
            "tinymce-anchor":       "bower_modules/tinymce/plugins/anchor/plugin",
            "tinymce-sr":           "bower_modules/tinymce/plugins/searchreplace/plugin",
            "tinymce-vb":           "bower_modules/tinymce/plugins/visualblocks/plugin",
            "tinymce-code":         "bower_modules/tinymce/plugins/code/plugin",
            "tinymce-fullscreen":   "bower_modules/tinymce/plugins/fullscreen/plugin",
            "tinymce-insertdt":     "bower_modules/tinymce/plugins/insertdatetime/plugin",
            "tinymce-table":        "bower_modules/tinymce/plugins/table/plugin",
            "tinymce-contextmenu":  "bower_modules/tinymce/plugins/contextmenu/plugin",
            "tinymce-paste":        "bower_modules/tinymce/plugins/paste/plugin"

        },
        include: [
            'requireLib',
            "tinymce-themes",
            "tinymce-advlist",
            "tinymce-autolink",
            "tinymce-lists",
            "tinymce-link",
            "tinymce-image",
            "tinymce-charmap",
            "tinymce-preview",
            "tinymce-anchor",
            "tinymce-sr",
            "tinymce-vb",
            "tinymce-code",
            "tinymce-fullscreen",
            "tinymce-insertdt",
            "tinymce-table",
            "tinymce-contextmenu",
            "tinymce-paste",
            'components/nav-bar/nav-bar',
            'components/upcoming-events/upcoming-events',
            'components/announcements/announcements',
            'components/events-list/events-list',
            'components/home-page/home-page',
            'components/document-list/document-list',
            'components/data-objects/data-object.js',
            'components/data-objects/announcement-do.js',
            'components/data-objects/date-time-do.js',
            'components/data-objects/schedule-do.js',
            'components/data-objects/event-do.js',
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
            'members-stuff': ['components/members-page/members-page', 'components/message-center-page/message-center-page',
                'components/forgot-password-page/forgot-password-page', 'components/profile-page/profile-page',
                'components/change-password/change-password'],
            'shoot-page-stuff': ['components/shoot-page/shoot-page'],
            'viewer-page-stuff': ['components/viewer-page/viewer-page']
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
        fcCSS = gulp.src('src/bower_modules/fullcalendar/dist/fullcalendar.css'),
        tmcCSS = gulp.src('src/bower_modules/tinymce/skins/lightgray/*.css')
            .pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/')),
        combinedCss = es.concat(tmcCSS, bowerCss, fcCSS, appCss).pipe(concat('css.css')),
        tmFontFiles = gulp.src('./src/bower_modules/tinymce/skins/lightgray/fonts/*', { base: './src/bower_modules/tinymce/skins/lightgray/' }),
        fontFiles = gulp.src('./src/bower_modules/components-bootstrap/fonts/*', { base: './src/bower_modules/components-bootstrap/' });
    return es.concat(combinedCss, fontFiles, tmFontFiles)
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

gulp.task('copy-img', function() {
    return gulp.src('./src/img/*.*')
        .pipe(gulp.dest('./dist/img/'));
});

gulp.task('copy-docs', function() {
    return gulp.src('./src/misc_docs/*.*')
        .pipe(gulp.dest('./dist/misc_docs/'));
});

gulp.task('copy-shoots-png', function() {
    return gulp.src('./src/misc_docs/shoots/*.png')
        .pipe(gulp.dest('./dist/misc_docs/shoots/'));
});

gulp.task('copy-shoots-jpg', function() {
    return gulp.src('./src/misc_docs/shoots/*.jpg')
        .pipe(gulp.dest('./dist/misc_docs/shoots/'));
});

gulp.task('copy-static', ['copy-img', 'copy-docs', 'copy-shoots-png', 'copy-shoots-jpg'], function(callback) {
    return callback();
});



// Removes all files from ./dist/
gulp.task('clean',  function() {
    return gulp.src(['./dist/*', './stage/*'], {read: false})
        .pipe(clean({force:true}));
});



gulp.task('default', ['html', 'js', 'css', 'copy-static'], function(callback) {
    return callback();
    console.log('\nPlaced optimized files in ' + chalk.magenta('dist/\n'));
});

gulp.task('package', ['html', 'js', 'css', 'copy-static'], function(callback) {
    var tar = require('gulp-tar');
    var gzip = require('gulp-gzip');

  	return gulp.src('./dist/**/*')
        .pipe(tar('kbweb.tar'))
        .pipe(gzip())
        .pipe(gulp.dest('./stage/'));
});




//add dependency here on package, maybe
gulp.task('ship', function(callback) {
    var GulpSSH = require('gulp-ssh');

    var gulpSSH = new GulpSSH({
        ignoreErrors: false,
        sshConfig: SSH_CONFIG
    });

    return gulp.src('./stage/kbweb.tar.gz')
        .pipe(gulpSSH.sftp('write', '/opt/web/stage/kbweb.tar.gz'));

});

// TODO:  Make a deploy script and ship it up to the server
// TODO:    can do more granular checking if the file exists, before blowing away kbweb directory
gulp.task('deploy', function(callback) {
    var GulpSSH = require('gulp-ssh');

    var gulpSSH = new GulpSSH({
        ignoreErrors: false,
        sshConfig: SSH_CONFIG
    });

    // change this to execute a tar -xzf command from the directory
    return gulpSSH.shell([
        'cd /opt/web/kbweb',
        'tar -czf ../stage/kbweb-bak.$(date +%Y%m%d%H%M).tar.gz *',
        'rm -rf *',
        'tar -xzf ../stage/kbweb.tar.gz'],
        {filePath: 'deploy.log'})
        .pipe(gulp.dest('./stage'));
});



