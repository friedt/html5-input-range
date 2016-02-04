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
                    base: ''
                }
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    'dist/range-slider.min.js': ['javascript/*.js']
                }
            }
        },
        copy: {
            html: {
                src: 'html/range-slider.html',
                dest: 'dist/index.html'
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
