module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.initConfig({

        jshint: {
            all: ['Gruntfile.js', 'models/**/*.js', 'test/**/*.js', 'routes/**/*.js'],
            options: {}
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        }
    });

    grunt.registerTask('default', ['mochaTest']);
    grunt.registerTask('test', ['jshint', 'mochaTest']);
};