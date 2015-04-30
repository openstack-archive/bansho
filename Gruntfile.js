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
            dist: ['<%= project.dist %>/'],
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

        jslint: { // configure the task

            client: {
                src: [
                    'karma.conf.js',
                    'Gruntfile.js',
                    '<%= project.app %>/app.js',
                    '<%= project.app %>/**/*.js'
                ],
                exclude: [
                    '<%= project.app %>/bower_components/**/*.js',
                    '<%= project.assets %>/**',
                    '<%= project.build %>/**'
                ],
                directives: {
                    node: true,
                    nomen: true,
                    unparam: true,
                    predef: [ // Global variables
                        'document', '$', '$get',
                        'angular', 'inject', 'JustGage',
                        'describe', 'beforeEach', 'it', 'expect',
                        'moment'
                    ]
                },
                options: {
                    edition: 'latest', // specify an edition of jslint or use 'dir/mycustom-jslint.js' for own path
                    junit: 'out/client-junit.xml', // write the output to a JUnit XML
                    log: 'out/client-lint.log',
                    jslintXml: 'out/client-jslint.xml',
                    errorsOnly: true, // only display errors
                    failOnError: false, // defaults to true
                    checkstyle: 'out/client-checkstyle.xml' // write a checkstyle-XML
                }
            }
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
                    '<%= project.app %>/components/live/adagios.js',
                    '<%= project.assets %>/sass/{,*/}*.{scss,sass}'
                ],
                tasks: ['copy:adagios', 'sass:dev']
            },
            surveil: {
                files: [
                    '<%= project.app %>/components/live/surveil.js',
                    '<%= project.assets %>/sass/{,*/}*.{scss,sass}'
                ],
                tasks: ['copy:surveil', 'sass:dev']
            }
        }
    });

    grunt.registerTask('default', ['watch']);

    grunt.registerTask('development:adagios', [
        'sass', 'copy:adagios', 'watch:adagios'
    ]);

    grunt.registerTask('development:surveil', [
        'sass', 'copy:surveil', 'watch:surveil'
    ]);

    grunt.registerTask('production:adagios', [
        'clean', 'sass', 'copy:prod','copy:adagios', 'useminPrepare:html', 'concat:generated', 'uglify:generated', 'usemin:html']);

    grunt.registerTask('production:surveil', [
        'clean', 'sass', 'copy:prod', 'copy:surveil', 'useminPrepare:html', 'concat:generated', 'uglify:generated', 'usemin:html']);
};
