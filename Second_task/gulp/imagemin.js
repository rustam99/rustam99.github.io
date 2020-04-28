'use strict';

import path from 'path';
import gulpif from 'gulp-if';
import pngquant from 'imagemin-pngquant';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;
  let dest = path.join(taskTarget);

  // Imagemin
  gulp.task('imagemin', (done) => {
     gulp.src(path.join(dirs.source, dirs.images, '**/*.{jpg,jpeg,gif,svg,png}'))
      .pipe(plugins.changed(dest))
      .pipe(gulpif(args.production, plugins.imagemin([
        plugins.imagemin.jpegtran({progressive: true}),
        plugins.imagemin.svgo({plugins: [{removeViewBox: false}]})
      ], { use: [pngquant({speed: 10})] })))
      .pipe(plugins.rename(function (path) {
        path.dirname = path.dirname.replace(dirs.source, '').replace('_', '')
      }))
      .pipe(gulp.dest(dest));

      done()
  });
}
