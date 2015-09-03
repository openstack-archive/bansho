'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        project: {
            app: 'app',
            assets: '<%= project.app %>/assets',
            scss: '<%= project.assets %>/sass/app.scss',
            tmp: '.tmp',
            dist: 'dist'
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                template: require('grunt-template-jasmine-requirejs')
            }
        },

        clean: {
            dist: [
                '<%= project.dist %>/assets/',
                '<%= project.dist %>/bower_components/',
                '<%= project.dist %>/components/',
                '<%= project.dist %>/js/',
                '<%= project.dist %>/templates/',
                '<%= project.dist %>/index.html'
            ],
            tmp: ['<%= project.tmp %>/']
        },

        copy: {
            prod: {
                files: [
                    {
                        cwd: '<%= project.assets %>/css/',
                        expand: true,
                        src: ['**.*'],
                        dest: '<%= project.dist %>/assets/css/'
                    },
                    {
                        cwd: '<%= project.assets %>/images/',
                        expand: true,
                        src: ['**.*'],
                        dest: '<%= project.dist %>/assets/images/'
                    },
                    {
                        cwd: '<%= project.app %>/',
                        expand: true,
                        src: ['**/*.html'],
                        dest: '<%= project.dist %>/'
                    },
                    {
                        src: '<%= project.app %>/components/config/config.json',
                        dest: '<%= project.dist %>/components/config/config.json'
                    },
                    {
                        src: '<%= project.app %>/components/config/componentsConfig.json',
                        dest: '<%= project.dist %>/components/config/componentsConfig.json'
                    },
                    {
                        src: '<%= project.app %>/components/config/defaultLayoutConfig.json',
                        dest: '<%= project.dist %>/components/config/defaultLayoutConfig.json'
                    },
                    {
                        src: '<%= project.app %>/index.html',
                        dest: '<%= project.dist %>/index.html'
                    },
                    {
                        cwd: '<%= project.app %>/bower_components/fontawesome/fonts',
                        expand: true,
                        src: ['**.*'],
                        dest: '<%= project.dist %>/assets/fonts'
                    }
                ]
            }
        },

        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    compass: false
                },
                files: {
                    '<%= project.assets %>/css/app.css': '<%= project.scss %>'
                }
            }
        },

        jshint: { // configure the task
            options: {
                node: true,
                loopfunc: true,
                globals: {
                    document: true,
                    angular: true,
                    $: true,
                    describe: true,
                    it: true,
                    expect: true,
                    beforeEach: true,
                    inject: true
                },
                force: true
            },
            all: [
                'karma.conf.js',
                'Gruntfile.js',
                '<%= project.app %>/app.js',
                '<%= project.app %>/**/*.js',
                '!<%= project.app %>/bower_components/**',
            ]
        },

        useminPrepare: {
            html: {
                src: ['<%= project.app %>/index.html']
            },
            options: {
                dest: '<%= project.dist %>/'
            }
        },

        usemin: {
            html: '<%= project.dist %>/index.html'
        },

        concat: {
            generated: {
                // Will be generated with usemin:html
                nonull: true
            }
        },

        cssmin: {
            generated: {
                // Will be generated with usemin:html
                nonull: true
            }
        },

        // Minify and concatenate bansho in one file
        uglify: {
            generated: {
                // Will be generated with usemin:html
                nonull: true
            },
            options: {
                mangle: true
            }
        },

        watch: {
            development: {
                files: [
                    '<%= project.app %>/**/*.js',
                    '<%= project.app %>/**/*.html',
                    '<%= project.assets %>/sass/{,*/}*.{scss,sass}'
                ],
                tasks: ['sass:dev', 'jshint:all', 'karma']
            },
            staging: {
                files: [
                    '<%= project.app %>/**/*.js',
                    '<%= project.app %>/**/*.html',
                    '<%= project.assets %>/sass/{,*/}*.{scss,sass}'
                ],
                tasks: ['production']
            },
            options: {
                livereload: true
            }
        }
    });

    grunt.registerTask('default', ['development']);

    grunt.registerTask('development', [
        'sass',
        'jshint:all',
        'karma',
        'watch:development'
    ]);

    grunt.registerTask('staging', [
        'production',
        'watch:development'
    ]);

    grunt.registerTask('production', [
        'clean',
        'sass',
        'copy:prod' ,
        'useminPrepare:html',
        'concat:generated',
        'uglify:generated',
        'cssmin:generated',
        'usemin:html'
    ]);
};
