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
                        src: '<%= project.app %>/components/config/developmentConfig.json',
                        dest: '<%= project.dist %>/components/config/developmentConfig.json'
                    },
                    {
                        src: '<%= project.app %>/index.html',
                        dest: '<%= project.dist %>/index.html'
                    }
                ]
            },
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
                tasks: ['sass:dev', 'jshint:all']
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
