// Load grunt tasks automatically


module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        less: {
            development: {

                files: {
                    'dist/range-slider.css': 'css/*.less'
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9002,
                    protocol: 'http',
                    useAvailablePort: true,
                    base: 'dist/',
                    hostname: 'localhost',
                    debug: true,
                    open: true
                }
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: [{
                    'dist/range-slider.min.js': ['javascript/*-slider.js']
                },
                {
                    'dist/range-slider-object.min.js': ['javascript/*-object.js']
                }]
            }
        },
        copy: {
            html:  {
                expand: true,
                cwd: 'html/',
                src: ['*.html'],
                dest: 'dist/'
            }
        },
        watch: {
            css: {
                files: ['css/*.less'],
                tasks: ['less']
            },
            js:{
                files: ['javascript/*.js'],
                tasks: ['uglify']
            },
            html: {
                files: ['html/*.html'],
                tasks: ['copy']
            },
            options: {
                livereload: true
            }
        }

    });


    // Default task(s).
    grunt.registerTask('default', ['connect', 'watch']);

};
