'use strict';

module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        project: {
            app: ['app'],
            assets: ['<%= project.app %>/assets'],
            css: ['<%= project.assets %>/sass/app.scss']
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
            }
        },

        jslint: { // configure the task

            client: {
                src: [
                    'karma.conf.js',
                    'Gruntfile.js',
                    'app/app.js',
                    'app/**/*.js'
                ],
                exclude: [
                    'app/bower_components/**/*.js',
                    'app/assets/**/*'
                ],
                directives: {
                    node: true,
                    unparam: true, // TEMPORARY: Ignore unused params
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
                    'app/build/js/adagios.js' : [
                        'app/app.js',
                        'app/components/config/config.js',
                        'app/components/live/live.js',
                        'app/components/live/notifications.js',
                        'app/components/live/get_services.js',
                        'app/components/ng-justgage/ng-justgage.js',
                        'app/components/filters/filters.js',
                        'app/components/sidebar/sidebar.js',
                        'app/components/topbar/topbar.js',
                        'app/components/tactical/tactical.js',
                        'app/components/tactical/status_overview/status_overview.js',
                        'app/components/tactical/current_health/current_health.js',
                        'app/components/tactical/top_alert_producers/top_alert_producers.js',
                        'app/components/table/table.js',
                        'app/components/table/cell_duration/cell_duration.js',
                        'app/components/table/cell_host/cell_host.js',
                        'app/components/table/cell_last_check/cell_last_check.js',
                        'app/components/table/cell_service_check/cell_service_check.js',
                        'app/components/table/cell_hosts_host/cell_hosts_host.js',
                        'app/components/table/cell_host_address/cell_host_address.js',
                        'app/components/table/cell_host_status/cell_host_status.js',
                        'app/dashboard/dashboard.js',
                        'app/hosts/hosts.js',
                        'app/services/services.js',
                        'app/custom_views/custom_views.js',

                        // Excluded files/directories
                        '!app/bower_components/**',
                        '!app/build/**', 
                        '!app/**/*_test.js'
                    ]
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jslint');

    grunt.registerTask('default', [ 'watch', 'jslint' , 'uglify']);
};
