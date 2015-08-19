module.exports = function(grunt) {

    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'stylesheets/main.css': 'stylesheets/main.scss'
                }
            }
        },
        watch: {
            sass: {
                files: ['stylesheets/*.scss','views/*.hjs'],
                tasks: ['sass'],
                options: {
                    livereload: true
                },
            },
            js: {
                files: ['javascripts/*.js'],
                tasks: ['sass'],
                options: {
                    livereload: true
                },
            },
        },
        browserSync: {
            default_options: {
                files: {
                    src: [
                        "stylesheets/*.css",
                        "*.html",
                        "javascripts/*.js"
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir:"./"
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default',['sass','browserSync','watch:sass']);
};
