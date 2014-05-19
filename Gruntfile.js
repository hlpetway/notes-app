module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'server.js', 'app/js/**/*.js', 'test/api/*.js'],
            options: {
                jshintrc: true
            }
        },
        clean: ['dist'],
        copy: {
            all: {
                expand: true,
                cwd: 'app/',
                src: ['Gruntfile.js', 'app/js/**/*.html'],
                dest: 'dist/',
                flatten: true,
                filter: 'isFile'
            }
        },

        browserify: {
            all: {
                src: 'app/js/**/*.js',
                dest: 'dist/client.js'
            },
            options: {
                transform: ['debowerify'],
                debug: true
            }
        },
        connect: {
            options: {
                port: process.env.PORT || 3000,
                base: 'public/',
            },

            all: {},
        },
        express: {
            dev: {
                options: {
                    background: true,
                    script: 'server.js'
                }
            },
            prod: {
                options: {
                    script: 'server.js',
                    node_env: 'production'
                }
            },
            test: {
                options: {
                    script: 'server.js'
                }
            }
        },
        watch: {
            scripts: {
                files: ['app/js/**/*.js', 'test/**/*.js']
            },
            express: {
                files: ['server.js'],
                tasks: ['browserify'],
                options: {
                    spawn: false
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        },

        all: {
            src: ['test/unit/**/*.js']
        }
    });

    grunt.registerTask('default', ['jshint', 'mochaTest']);
    grunt.registerTask('server', ['build', 'express:dev', 'watch']);
    grunt.registerTask('test', ['jshint', 'mochaTest']);
    grunt.registerTask('build', ['clean', 'copy', 'browserify']);

};