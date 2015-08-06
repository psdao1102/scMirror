module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/*.js',
        dest: 'build/master.min.js'
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'public/theme/compass/sass',
          cssDir: 'build',
          environment: 'production'
        }
      },
      dev: {
        options: {
          sassDir: 'public/theme/compass/sass',
          cssDir: 'build'
        }
      }
    },

    express: {
      dev: {
        options: {
          script: "startup.js",
          port: 3000,
          background: false
        }
      }
    },

    clean: ['build/**/*']

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', [
    'uglify',
    'compass:dev'
  ]);

  grunt.registerTask('srv', [
    'default',
    'express'
  ]);

  grunt.registerTask('prd', [
    'uglify',
    'compass:dist'
  ]);

};