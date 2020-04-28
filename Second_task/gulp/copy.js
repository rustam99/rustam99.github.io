'use strict';

import path from 'path';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;
  let dest = path.join(taskTarget);

  // Copy
  gulp.task('copy', (done) => {
    gulp.src([
      path.join(dirs.source, '**/*'),
      '!' + path.join(dirs.source, '{**/\_*,**/\_*/**}'),
      '!' + path.join(dirs.source, '**/*.jade')
    ])
    .pipe(plugins.changed(dest))
    .pipe(plugins.rename(function (path) {
      path.dirname = path.dirname.replace(dirs.source, '')
    }))
    .pipe(gulp.dest(dest));
    done();
  });
}
