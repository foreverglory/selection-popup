/* 
 * This file is part of the current project.
 * 
 * (c) ForeverGlory <http://foreverglory.me/>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var gulp = require("gulp");
var path = require('path');
var rimraf = require('rimraf');

gulp.task("default", function() {
  return;
});

gulp.task('clean', (callback) => {
  let dist = path.resolve('dist');
  rimraf.sync(dist);
  callback();
});