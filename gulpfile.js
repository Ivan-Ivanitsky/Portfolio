const { src, dest, watch, parallel, series } = require("gulp"); // пути src-берем
//dest- сохраняем
//watch-наблюдаем
//prallel-выполнить операции  паралельно
//series выполнить несколько функций

const cssMin = require("gulp-cssmin"); // компресия файлов для css
const concat = require("gulp-concat"); // добавляем min.css
const uglify = require("gulp-uglify-es").default; // компресия файлов js
const browserSync = require("browser-sync").create();
const clean = require("gulp-clean");
const imgmin = require("gulp-imagemin");
const svgmin = require("gulp-svgmin");

function img() {
  return src("src/assets/img/**/*.png")
    .pipe(imgmin())
    .pipe(dest("src/assets/img"));
}

function svg() {
  return src("src/assets/img/**/*.svg")
    .pipe(svgmin())
    .pipe(dest("src/assets/icon"));
}

function styles() {
  return src("src/**/style.css")
    .pipe(cssMin())
    .pipe(concat("style.min.css"))
    .pipe(dest("src/css"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src("src/**/script.js")
    .pipe(concat("script.min.js"))
    .pipe(uglify())
    .pipe(dest("src/js"))
    .pipe(browserSync.stream());
}

function watching() {
  watch(["src/style.css"], styles); // изменения css
  watch(["src/script.js"], scripts); // изменения js
  watch("src/**/*.html").on("change", browserSync.reload); // следим за изменением в html
}

function browserSyncStart() {
  browserSync.init({
    server: {
      baseDir: "src/",
    },
  });
}

function cleanDist() {
  return src("dist").pipe(clean());
}

function building() {
  return src(
    [
      "src/**/*.min.css",
      "src/**/*script.min.js",
      "src/**/*.html",
      "src/assets/**/*",
      "src/fonts/*",
    ],
    {
      base: "src",
    }
  ).pipe(dest("dist"));
}

exports.svg = svg;
exports.img = img;
exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browserSyncStart = browserSyncStart;

exports.build = series(cleanDist, building);

exports.default = parallel(
  styles,
  img,
  svg,
  scripts,
  browserSyncStart,
  watching
);
