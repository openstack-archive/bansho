'use strict';

module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        project: {
            app: ['app'],
            assets: ['<%= project.app %>/assets'],
            css: ['<%= project.assets %>/sass/app.scss'],
            build: ['<%= project.app %>/build/']
        },

        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    compass: false
                },
                files: {
                    '<%= project.assets %>/css/app.css' : '<%= project.css %>'
                }
            }
        },

        watch: {
            sass: {
                files: [
                    '<%= project.assets %>/sass/{,*/}*.{scss,sass}',
                    '<%= project.app %>/{,*/}*/{,*/}*.{scss,sass}'
                ],
                tasks: ['sass:dev']
            },
            uglify: {
                files: [
                    '<%= project.app %>/**/*.js',
                    '<%= project.app %>/**/*_test.js',
                    '!<%= project.app %>/bower_components/**',
                    '!<%= project.build %>/**',
                    '!<%= project.assets %>/**'
                ],
                tasks: ['uglify:compress']
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

        // Minify and concatenate adagios in one file
        uglify: {
            compress: {
                files: [{
                    '<%= project.build %>/js/adagios.js' : [
                        '<%= project.app %>/app.js',
                        '<%= project.app %>/components/config/config.js',
                        '<%= project.app %>/components/live/live.js',
                        '<%= project.app %>/components/live/notifications.js',
                        '<%= project.app %>/components/live/get_services.js',
                        '<%= project.app %>/components/ng-justgage/ng-justgage.js',
                        '<%= project.app %>/components/filters/filters.js',
                        '<%= project.app %>/components/sidebar/sidebar.js',
                        '<%= project.app %>/components/topbar/topbar.js',
                        '<%= project.app %>/components/tactical/tactical.js',
                        '<%= project.app %>/components/tactical/status_overview/status_overview.js',
                        '<%= project.app %>/components/tactical/current_health/current_health.js',
                        '<%= project.app %>/components/tactical/top_alert_producers/top_alert_producers.js',
                        '<%= project.app %>/components/table/table.js',
                        '<%= project.app %>/components/table/cell_duration/cell_duration.js',
                        '<%= project.app %>/components/table/cell_host/cell_host.js',
                        '<%= project.app %>/components/table/cell_last_check/cell_last_check.js',
                        '<%= project.app %>/components/table/cell_service_check/cell_service_check.js',
                        '<%= project.app %>/components/table/cell_hosts_host/cell_hosts_host.js',
                        '<%= project.app %>/components/table/cell_host_address/cell_host_address.js',
                        '<%= project.app %>/components/table/cell_host_status/cell_host_status.js',
                        '<%= project.app %>/dashboard/dashboard.js',
                        '<%= project.app %>/hosts/hosts.js',
                        '<%= project.app %>/services/services.js',
                        '<%= project.app %>/custom_views/custom_views.js',

                        // Excluded files/directories
                        '!<%= project.app %>/bower_components/**',
                        '!<%= project.app %>/build/**',
                        '!<%= project.app %>/**/*_test.js'
                    ]
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jslint');

    grunt.registerTask('default', [ 'watch', 'jslint', 'uglify']);
};
