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
                        src: '<%= project.app %>/index.html',
                        dest: '<%= project.dist %>/index.html'
                    }
                ]
            },
            adagios: {
                files: [
                    {
                        src: '<%= project.app %>/components/live/adagios.js',
                        dest: '<%= project.app %>/components/live/live.js'
                    }
                ]
            },
            surveil: {
                files: [
                    {
                        src: '<%= project.app %>/components/live/surveil.js',
                        dest: '<%= project.app %>/components/live/live.js'
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
                '!<%= project.app %>/**/live.js',
                '!<%= project.app %>/**/adagios.js'
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
                nonull: true
            }
        },

        // Minify and concatenate bansho in one file
        uglify: {
            generated: {
                nonull: true
            },
            options: {
                mangle: true
            }
        },

        watch: {
            adagios: {
                files: [
                    '<%= project.app %>/**/*.js',
                    '<%= project.app %>/**/*.html',
                    '<%= project.app %>/components/live/adagios.js',
                    '<%= project.assets %>/sass/{,*/}*.{scss,sass}'
                ],
                tasks: ['copy:adagios', 'sass:dev', 'jshint:all']
            },
            surveil: {
                files: [
                    '<%= project.app %>/**/*.js',
                    '<%= project.app %>/**/*.html',
                    '<%= project.app %>/components/live/surveil.js',
                    '<%= project.assets %>/sass/{,*/}*.{scss,sass}'
                ],
                tasks: ['copy:surveil', 'sass:dev', 'jshint:all']
            },
            staging: {
                files: [
                    '<%= project.app %>/**/*.js',
                    '<%= project.app %>/**/*.html',
                    '<%= project.app %>/components/live/surveil.js',
                    '<%= project.assets %>/sass/{,*/}*.{scss,sass}'
                ],
                tasks: ['production:surveil']
            },
            options: {
                livereload: true
            }
        }
    });

    grunt.registerTask('default', ['watch']);

    grunt.registerTask('development:adagios', [
        'sass', 'copy:adagios', 'jshint:all', 'watch:adagios'
    ]);

    grunt.registerTask('development:surveil', [
        'sass', 'copy:surveil', 'jshint:all', 'watch:surveil'
    ]);

    grunt.registerTask('staging:surveil', [
        'production:surveil', 'watch:staging']);

    grunt.registerTask('production:adagios', [
        'clean', 'sass', 'copy:prod', 'copy:adagios', 'useminPrepare:html', 'concat:generated', 'uglify:generated', 'usemin:html']);

    grunt.registerTask('production:surveil', [
        'clean', 'sass', 'copy:prod', 'copy:surveil', 'useminPrepare:html', 'concat:generated', 'uglify:generated', 'usemin:html']);
};
