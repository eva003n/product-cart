const { src, dest, watch, series } = require("gulp");
// const sass = require("gulp-sass")(require("sass"));
// const postcss = require("gulp-postcss");
// const cssnano = require("cssnano");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();

// Sass Task
// function scssTask() {
//   return src("app/scss/**/*.scss", { sourcemaps: true })
//     .pipe(sass().on("error", sass.logError))
//     .pipe(postcss([cssnano()]))
//     .pipe(dest("dist", { sourcemaps: "." }));
// }

// JavaScript Task
function jsTask() {
  return src("app/js/scripts.js", { sourcemaps: true })
    .pipe(terser())
    .pipe(dest("dist", { sourcemaps: "." }));
}

// Browsersync Tasks
function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}

function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch("*.html", browsersyncReload);
  watch(
    ["app/js/**/*.js"],
    series(jsTask, browsersyncReload)
  );
}

// Default Gulp task
exports.default = series( jsTask, browsersyncServe, watchTask);
