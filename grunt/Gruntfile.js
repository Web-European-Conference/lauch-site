module.exports = function(grunt) {
    grunt.initConfig({
      nodemon: {
        dev: {
          script: '../src/app.js',
          options: {
            watchedExtensions: ['js'],
            nodeArgs: ['--debug'],
          },
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });
          },
        }
      }
    });

    grunt.loadNpmTasks('grunt-nodemon');

    // Default task(s).
    //grunt.registerTask('default', ['express']);
    grunt.registerTask('default', ['nodemon:dev']);
};