const {
  src, dest, series,
} = require('gulp');
const rename = require('gulp-rename');
const imageResize = require('gulp-image-resize');

const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const config = require('./config.js');

function buildIcons(cb) {
  config.iconSizes.forEach(function (size) {
    return src('icon/*')
      .pipe(
        plumber({
          errorHandler: notify.onError('Error: <%= error.message %>'),
        }),
      )
      .pipe(imageResize({
        imageMagick: true,
        width: size.width,
        height: size.heigth,
      }))
      .pipe(rename((path) => {
        path.basename = `${path.basename}@${size.width}x${size.heigth}`;
      }))
      .pipe(
        dest(`images/`),
      );
  });
  cb();
}
exports.buildIcons = buildIcons;

const build = series(
  buildIcons,
);

exports.build = build;
