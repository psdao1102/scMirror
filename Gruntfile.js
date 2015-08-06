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

    concat: {
      dist: {
        src: [
          'public/theme/compass/sass/*.scss',
        ],
        dest: 'build/master.scss',
      }
    },

    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'public/theme/compass/sass',
          cssDir: 'build',
          environment: 'production'
        }
      },
      dev: {                    // Another target
        options: {
          sassDir: 'public/theme/compass/sass',
          cssDir: 'build'
        }
      }
    },

    clean: ['build/**']

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-clean');


  grunt.registerTask('default', [
    'uglify',
    'concat',
    'compass'
  ]);

};