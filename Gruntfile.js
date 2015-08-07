module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';\n',
      },
      js: {
        src: [
          'public/js/jquery.min.js',
          'public/js/bootstrap.min.js',
          'public/js/jquery-migrate.min.js',
          'public/js/theme.js',
          'public/js/jquery-ui.min.js'
        ],
        dest: 'public/build/js/master.js'
      },
      css: {
        src: [
          'public/build/css/build.css',
          'public/css/style.css'
        ],
        dest: 'public/build/css/build.css'
      }
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
          config: 'public/theme/compass/config.rb',
          specify: 'public/theme/compass/sass/build.scss',
          environment: 'production'
        }
      },
      dev: {
        options: {
          specify: 'public/theme/compass/sass/build.scss',
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
      node: {
        files: [
          'views/**/*',
          'routes/**/*',
          'Models/**/*',
          'app.js',
          'package.json',
          'startup.js'
        ],
        tasks: [
          'express'
        ]
      },
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
    'concat:js',
    'uglify',
    'compass:dev',
    'concat:css'
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