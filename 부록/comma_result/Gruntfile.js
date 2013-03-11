/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    jshint: {
      options: {
        browser: true
      },
      all: {
        src: ['setComma.js']
      }
    },
    uglify :{
      all: {
        files : {
          "setComma.min.js":['setComma.js']
        }
      }
    },
    qunit : {
      all : ["test.html"]
    },
    cssmin: {
        all: {
            src: 'setComma.css',
            dest: 'setComma.min.css'
        }
    },
    csslint: {
        all: {
            src: "setComma.css",
            rules: {
                "import": false,
                "overqualified-elements": 2
            }
        }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-css');

  // Default task.
  grunt.registerTask('default', ['jshint', 'uglify', 'qunit', 'csslint', 'cssmin']);

};
