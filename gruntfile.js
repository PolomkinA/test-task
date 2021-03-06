module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //Uglify you js
        uglify: {
            build: {
                src: 'src/js/*.js',
                dest: 'dist/js/common.min.js'
            }
        },

        //Minify you images
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: 'dist/images/'
                }]
            }
        },

        //You can to hint you js
        jshint:{
            options: {
                reporter: require('jshint-stylish')
            },

            main: [
                'src/js/*.js'
            ]
        },

        //Less to css
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'dist/css/style.css': 'src/styles/style.scss'
                }
            }
        },
        // Base html build
        htmlbuild: {
            dev: {
                src: 'src/views/*.html',
                dest: 'dist/',
                options: {
                    basePath: 'src/views/'
                }
            }
        },

        //Post process autoprefix
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },
            main: {
                expand: true,
                flatten: true,
                src: 'dist/css/*.css',
                dest: 'dist/css'
            }
        },

        //Auto-watching you changes (type CTRL + S for save changes & it`ll work)
        watch: {
            //Scripts change
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['jshint','uglify']

            },
            //Less files change
            css: {
                files: ['src/**/*.scss'],
                tasks: ['sass','autoprefixer']
            },
            //HTML files change
            html: {
                files: ['src/views/*.html'],
                tasks: ['htmlbuild']
            }
        }

    });

    //Load Tasks
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //Register Tasks
    grunt.registerTask('default', ['uglify', 'imagemin', 'jshint', 'sass', 'autoprefixer','htmlbuild']);
};