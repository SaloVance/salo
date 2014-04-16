module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    //https://npmjs.org/package/grunt-contrib-clean
    clean: {
      build: ['build']
    },
    
    //https://npmjs.org/package/grunt-contrib-concat
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> | v<%= pkg.version %> | ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
      js: {
        options: {
          separator: ';',
        },
        files: {
          'build/static/js/main.js': ['static/js/lib/*.js', 'static/js/plugin/*.js'],
        }
      },
      css: {
        files: {
          'build/static/css/main.css': 
            [
              'static/css/reset.css',
              'static/css/util.css',
              'static/css/base.css',
            ],
        }
      }
    },
    
    //https://npmjs.org/package/grunt-contrib-uglify
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> | v<%= pkg.version %> | ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
      js: {
        files: {
          'build/static/js/main.js': ['build/static/js/main.js'],
        }
      }
    },
    
    //https://npmjs.org/package/grunt-contrib-copy
    copy: {
      build: {
        files: [
          {expand: true, src: ['static/**'], dest: 'build/'},
          {expand: true, src: ['templates/**'], dest: 'build/'},
        ]
      },
      dist: {
        files: [
          {expand: true, cwd: 'build/', src: ['**'], dest: '../dist/'},
        ]
      }
    },
    
    //https://npmjs.org/package/grunt-contrib-watch
    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      files: [
        'static/css/**/*.css', 
        'static/js/**/*.js', 
        'static/html/**/*.html',
        'templates/**/*.tpl'
      ],
    },
    
    // https://npmjs.org/package/grunt-devserver
    devserver: {
      dev: {
        options: {
          base: '.',
          port: 8888
        }
      },
      build: {
        options: {
          base: 'build',
          port: 8888
        }
      }
    },
    
    //https://npmjs.org/package/grunt-php
    php: {
      options: {
        keepalive: true
      },
      watch: {
        livereload: true
     },
    },
    
    //https://npmjs.org/package/grunt-concurrent
    concurrent: {
      target: {
        options: {
          logConcurrentOutput: true
        },
        tasks: ['php:watch', 'watch'],
      },
    },

  });
  
  //load tasks
  grunt.loadNpmTasks('grunt-install-dependencies');
  grunt.loadNpmTasks('grunt-check-modules');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-php');
  grunt.loadNpmTasks('grunt-devserver');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-copy');
  
  //define cmd
  //grunt.registerTask('default', ['concurrent']);
  //grunt.registerTask('release', ['copy:build', 'concat', 'uglify', 'copy:dist', 'clean']);
};