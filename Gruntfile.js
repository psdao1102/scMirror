module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'public/js/bootstrap.min.js',
          'public/js/jquery.min.js',
          'public/js/jquery-migrate.min.js',
          'public/js/theme.js',
          'public/js/jquery-ui.min.js'
        ],
        dest: 'public/build/js/master.js'
      },
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'public/build/js/master.js',
        dest: 'public/build/js/master.min.js'
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'public/theme/compass/sass/build.scss',
          cssDir: 'public/build/css',
          config: 'public/theme/compass/config.rb',
          environment: 'production'
        }
      },
      dev: {
        options: {
          sassDir: 'public/theme/compass/sass/build.scss',
          cssDir: 'public/build/css',
          config: 'public/theme/compass/config.rb'
        }
      }
    },

    express: {
      dev: {
        options: {
          script: "startup.js",
          port: 3000
          //background: false
        }
      }
    },

    open : {
      dev : {
        path: 'http://localhost:3000/',
        app: 'Google Chrome'
      }
    },

    watch: {
      scripts: {
        files: [
          'public/js/**/*'
        ],
        tasks: [
          'uglify'
        ]
      },
      scss: {
        files: [
          'public/theme/compass/sass/**/*'
        ],
        tasks: [
          'compass'
        ]
      },
      options: {
        spawn: false
      }
    },

    clean: ['public/build/**/*']

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'concat',
    'uglify',
    'compass:dev'
  ]);

  grunt.registerTask('srv', [
    'default',
    'express',
    'open',
    'watch'
  ]);

  grunt.registerTask('prd', [
    'uglify',
    'compass:dist'
  ]);

};