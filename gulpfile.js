var gulp  = require('gulp')
    browserify = require('browserify'),
    exec = require('child_process').exec;

gulp.task("build-js", function() {
    exec('browserify src/index.js -o dist/bundle.js', function (err, stdout, stderr) {
        console.log("bundle build");
      });
});

gulp.task("watch", function() {
    gulp.watch("src/**/*.js", ["build-js"]);
});