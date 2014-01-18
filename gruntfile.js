module.exports = function(grunt) {

    // Load Tasks
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        compass: {
            prod: {
                options: {
                    sassDir: './app/scss',
                    cssDir: './public/css',
                    outputStyle: 'compressed'
                }
            },
            dev :{
                options: {
                    sassDir: './app/scss',
                    cssDir: './public/css',
                    environment: 'development'
                }
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'app/',
                    src: ['images/**/*.{png,jpg,gif}'],
                    dest: 'public/'
                }]
            }
        },

        uglify: {
            prod: {
                files: {
                    './public/js/lib.js': ['./app/js/lib/jquery-2.0.3.min.js'
                        , './app/js/lib/underscore-min.js'
                        , './app/js/lib/backbone-min.js'
                        , './app/js/lib/skel.min.js'
                        ],
                    './public/js/vendor.js': './app/js/vendor/*.js',
                    './public/js/app.js': './app/js/init.js',
                }
            },
            dev: {
                './public/js/lib.js': ['./app/js/vendor/jquery-2.0.3.min.js'
                    , './app/js/vendor/underscore-min.js'
                    , './app/js/vendor/backbone-min.js'
                    , './app/js/vendor/skel.min.js'
                    ],
                './public/js/vendor.js': './app/js/vendor/*.js',
                './public/js/app.js': './app/js/init.js'
            }
        },

        clean: {
            clean: ['./build']
        },

        watch: {

            sass: {
                files: ['./app/scss/*.{scss,sass}'],
                tasks: ['compass:dev']
            },
            js: {
                files: ['./app/js/**/*.js'
                   ],
                tasks: ['uglify']
            }
        }
    });

    grunt.registerTask('default', ['uglify:dev', 'compass:dev', 'imagemin', 'watch']);
    grunt.registerTask('prod',['uglify:prod', 'compass:prod', 'imagemin', 'clean']);
    grunt.registerTask('dev', ['uglify:dev', 'compass:dev', 'imagemin']);
    grunt.registerTask('style', ['compass']);
};