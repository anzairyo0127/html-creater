const gulp = require("gulp");
const notify = require("gulp-notify");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const autoprefixer = require("gulp-autoprefixer");
const webpackStream = require("webpack-stream");
const ejs = require("gulp-ejs");
const webpack = require("webpack");
// webpackの設定ファイルの読み込み
const webpackConfig = require("./webpack.config");

const paths = {
  root: './dist/',
  ejs: ['./src/pug/**/*.ejs', '!./src/pug/**/_*.ejs'],
  html: './dist/html/',
  scssSrc: './src/scss/**/*.scss',
  cssDist: './dist/css/',
  jsDist: './dist/scripts/'
};

gulp.task("scss", () => {
  return (gulp.src(paths.scssSrc)
  .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })))
  .pipe(sass({ outputStyle: "compressed"}))
  .pipe(autoprefixer({
    cascade: false,
    grid: true
  }))
  .pipe(gulp.dest(paths.cssDist))
});

gulp.task("ejs", () => {
  return (gulp.src(paths.ejs)
  .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })))
  .pipe(ejs({}, {}, {ext: ".html"}))
  .pipe(gulp.dest(paths.html))
});

gulp.task("webpack", () => {
  return webpackStream(webpackConfig, webpack)
  .pipe(gulp.dest(paths.jsDist));
});
