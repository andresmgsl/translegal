// generated on 2015-08-17 using generator-gulp-webapp 1.0.3
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';
import nodemon from 'gulp-nodemon';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const BROWSER_SYNC_RELOAD_DELAY = 500;

const paths = {
    scripts: ['./client/app/**/*.js','./client/components/**/*.js'],
    styles: ['./client/app/**/*.css','./client/components/**/*.css'],
    index: './client/app/index.html',
    partials: ['./client/app/**/*.html', '!./client/index.html', './client/components/**/*.html'],
    distDev: '.',
    distProd: './dist',
    distScriptsProd: './dist/scripts',
    scriptsDevServer: './server/**/*.js',
    tempStyles: './tmp/styles',
    assets: './client/assets/images',
    fonts: './client/app/font',
    server: './server/**/*.js'
};

gulp.task('styles', () => {
  return gulp.src(paths.styles)
    .pipe($.sourcemaps.init())
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(paths.tempStyles))
    .pipe(reload({stream: true}));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
const testLintOptions = {
  env: {
    mocha: true
  }
};

gulp.task('lint', lint(paths.scripts));
//gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('html', ['styles'], () => {
  const assets = $.useref.assets({searchPath: paths.assets});

  return gulp.src(paths.partials)
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src(paths.assets)
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat(paths.fonts))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});


gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    // nodemon our expressjs server
    script: './server/app.js',
    // watch core server file(s) that require server restart on change
    watch: [paths.scripts,paths.server,paths.styles, paths.assets, paths.fonts],
    env: { 'NODE_ENV': 'development' },
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false   //
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});


gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'nodemon'], () => {
  browserSync.init({
    logLevel: "info",
    proxy: "http://localhost:9000",
    notify: false,
    middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    }
  }); 
  gulp.watch(paths.styles, ['styles']);
  gulp.watch([paths.partials, paths.scripts, paths.styles, paths.assets, 
              paths.fonts,paths.server]).on('change', reload)
  //gulp.watch(paths.fonts, ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);  
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    //port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', () => {
  browserSync({
    notify: false,
    //port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src(paths.partials)
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

//gulp.task('default', ['clean'], () => {
  //gulp.start('build');
//});
gulp.task('default', ['serve']);
