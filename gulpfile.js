var gulp = require('gulp');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
 
gulp.task("default", function() {
  var jsFilter = filter("**/*.js");
  var cssFilter = filter("**/*.css");
 
  var indexHtmlFilter = filter(['**/*', '!/index.html'],{restore: true});

  return gulp.src("src/index.html")
    .pipe(useref())      // Concatenate with gulp-useref 
    .pipe(jsFilter)
    .pipe(uglify())             // Minify any javascript sources 
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(csso())               // Minify any CSS sources 
    .pipe(cssFilter.restore())
    .pipe(rev())                // Rename the concatenated files 
    .pipe(userefAssets.restore())
    .pipe(useref())
    .pipe(revReplace())         // Substitute in new filenames 
    .pipe(gulp.dest('public'));
});