module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        predef: ["document", "console", "$", "event", "target", "alert", "XMLHttpRequest", "new", "window", "require", "currentTarget", "firebase", "$scope", "$window", "localStorage"],
        esnext: true,
        globalstrict: true,
        globals: {"angular": true, "app":true, "$":true}
      },
      files: ['../app/**/*.js']
    },
    sass: {
      dist: {
        files: {
          '../css/main.css': '../sass/main.scss'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['../app/**/*.js'],
        tasks: ['jshint']
      },
      sass: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint', 'sass', 'watch']);
};