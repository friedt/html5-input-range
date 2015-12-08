

	// Load grunt tasks automatically


module.exports = function(grunt) {

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
					port: 9001,
					base: ''
				}
			}
		},
		uglify: {
			options: {
				mangle: false
			},
			my_target: {
				files: {
					'dist/range-slider.min.js': ['javascript/*.js']
				}
			}
		},
		watch: {
			css: {
				files: ['**/*.less','**/*.js', '**/*.html'],
				tasks: ['less','uglify'],
				options: {
					livereload: true
				}
			}
		}
	});



	// Default task(s).
	grunt.registerTask('default', ['connect', 'less', 'uglify', 'watch']);

};
