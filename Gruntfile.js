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
                tasks: ['uglify:dev']
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

        // Minify and concatenate adagios in one file
        uglify: {
            compress: {
                files: [{
                    '<%= project.build %>/js/adagios.min.js' : [
                        '<%= project.app %>/app.js',
                        '<%= project.app %>/components/config/config.js',
                        '<%= project.app %>/components/live/live.js',
                        '<%= project.app %>/components/live/notifications.js',
                        '<%= project.app %>/components/live/get_objects.js',
                        '<%= project.app %>/components/ng-justgage/ng-justgage.js',
                        '<%= project.app %>/components/filters/filters.js',
                        '<%= project.app %>/components/sidebar/sidebar.js',
                        '<%= project.app %>/components/topbar/topbar.js',
                        '<%= project.app %>/components/tactical/tactical.js',
                        '<%= project.app %>/components/tactical/status_overview/status_overview.js',
                        '<%= project.app %>/components/tactical/current_health/current_health.js',
                        '<%= project.app %>/components/tactical/top_alert_producers/top_alert_producers.js',
                        '<%= project.app %>/components/table/actionbar/actionbar.js',
                        '<%= project.app %>/components/table/table.js',
                        '<%= project.app %>/components/table/cell_duration/cell_duration.js',
                        '<%= project.app %>/components/table/cell_host/cell_host.js',
                        '<%= project.app %>/components/table/cell_last_check/cell_last_check.js',
                        '<%= project.app %>/components/table/cell_service_check/cell_service_check.js',
                        '<%= project.app %>/components/table/cell_hosts_host/cell_hosts_host.js',
                        '<%= project.app %>/components/table/cell_host_address/cell_host_address.js',
                        '<%= project.app %>/components/table/cell_host_status/cell_host_status.js',
                        '<%= project.app %>/components/host/host.js',
                        '<%= project.app %>/components/host/host_cpu/host_cpu.js',
                        '<%= project.app %>/components/host/host_info/host_info.js',
                        '<%= project.app %>/components/host/host_load/host_load.js',
                        '<%= project.app %>/components/host/host_main/host_main.js',
                        '<%= project.app %>/components/host/host_services_list/host_services_list.js',
                        '<%= project.app %>/components/service/service.js',
                        '<%= project.app %>/components/service/service_main/service_main.js',
                        '<%= project.app %>/components/service/service_info/service_info.js',
                        '<%= project.app %>/components/service/service_metrics/service_metrics.js',
                        '<%= project.app %>/routing_view/routing_view.js',
                        '<%= project.app %>/templates/dashboard/dashboard.js',
                        '<%= project.app %>/templates/single_table/single_table.js',
                        '<%= project.app %>/templates/host/host.js',
                        '<%= project.app %>/templates/service/service.js'
                    ]
                }],
                options: {
                    mangle: true
                }
            },
            dev: {
                files: [
                    {
                        '<%= project.build %>/app.js': '<%= project.app %>/app.js',
                        '<%= project.build %>/components/config/config.js': '<%= project.app %>/components/config/config.js',
                        '<%= project.build %>/components/live/live.js': '<%= project.app %>/components/live/live.js',
                        '<%= project.build %>/components/live/notifications.js': '<%= project.app %>/components/live/notifications.js',
                        '<%= project.build %>/components/live/get_objects.js': '<%= project.app %>/components/live/get_objects.js',
                        '<%= project.build %>/components/ng-justgage/ng-justgage.js': '<%= project.app %>/components/ng-justgage/ng-justgage.js',
                        '<%= project.build %>/components/filters/filters.js': '<%= project.app %>/components/filters/filters.js',
                        '<%= project.build %>/components/sidebar/sidebar.js': '<%= project.app %>/components/sidebar/sidebar.js',
                        '<%= project.build %>/components/topbar/topbar.js': '<%= project.app %>/components/topbar/topbar.js',
                        '<%= project.build %>/components/tactical/tactical.js': '<%= project.app %>/components/tactical/tactical.js',
                        '<%= project.build %>/components/tactical/status_overview/status_overview.js': '<%= project.app %>/components/tactical/status_overview/status_overview.js',
                        '<%= project.build %>/components/tactical/current_health/current_health.js': '<%= project.app %>/components/tactical/current_health/current_health.js',
                        '<%= project.build %>/components/tactical/top_alert_producers/top_alert_producers.js': '<%= project.app %>/components/tactical/top_alert_producers/top_alert_producers.js',
                        '<%= project.build %>/components/table/actionbar/actionbar.js': '<%= project.app %>/components/table/actionbar/actionbar.js',
                        '<%= project.build %>/components/table/table.js': '<%= project.app %>/components/table/table.js',
                        '<%= project.build %>/components/table/cell_duration/cell_duration.js': '<%= project.app %>/components/table/cell_duration/cell_duration.js',
                        '<%= project.build %>/components/table/cell_host/cell_host.js': '<%= project.app %>/components/table/cell_host/cell_host.js',
                        '<%= project.build %>/components/table/cell_last_check/cell_last_check.js': '<%= project.app %>/components/table/cell_last_check/cell_last_check.js',
                        '<%= project.build %>/components/table/cell_service_check/cell_service_check.js': '<%= project.app %>/components/table/cell_service_check/cell_service_check.js',
                        '<%= project.build %>/components/table/cell_hosts_host/cell_hosts_host.js': '<%= project.app %>/components/table/cell_hosts_host/cell_hosts_host.js',
                        '<%= project.build %>/components/table/cell_host_address/cell_host_address.js': '<%= project.app %>/components/table/cell_host_address/cell_host_address.js',
                        '<%= project.build %>/components/table/cell_host_status/cell_host_status.js': '<%= project.app %>/components/table/cell_host_status/cell_host_status.js',

                        '<%= project.build %>/components/host/host.js': '<%= project.app %>/components/host/host.js',
                        '<%= project.build %>/components/host/host_cpu/host_cpu.js': '<%= project.app %>/components/host/host_cpu/host_cpu.js',
                        '<%= project.build %>/components/host/host_info/host_info.js': '<%= project.app %>/components/host/host_info/host_info.js',
                        '<%= project.build %>/components/host/host_load/host_load.js': '<%= project.app %>/components/host/host_load/host_load.js',
                        '<%= project.build %>/components/host/host_main/host_main.js': '<%= project.app %>/components/host/host_main/host_main.js',
                        '<%= project.build %>/components/host/host_services_list/host_services_list.js': '<%= project.app %>/components/host/host_services_list/host_services_list.js',
                        '<%= project.build %>/components/service/service.js': '<%= project.app %>/components/service/service.js',
                        '<%= project.build %>/components/service/service_main/service_main.js': '<%= project.app %>/components/service/service_main/service_main.js',
                        '<%= project.build %>/components/service/service_info/service_info.js': '<%= project.app %>/components/service/service_info/service_info.js',
                        '<%= project.build %>/components/service/service_metrics/service_metrics.js': '<%= project.app %>/components/service/service_metrics/service_metrics.js',

                        '<%= project.build %>/routing_view/routing_view.js': '<%= project.app %>/routing_view/routing_view.js',
                        '<%= project.build %>/templates/dashboard/dashboard.js': '<%= project.app %>/templates/dashboard/dashboard.js',
                        '<%= project.build %>/templates/single_table/single_table.js' : '<%= project.app %>/templates/single_table/single_table.js',
                        '<%= project.build %>/templates/host/host.js': '<%= project.app %>/templates/host/host.js',
                        '<%= project.build %>/templates/service/service.js': '<%= project.app %>/templates/service/service.js'
                    },
                    {
                        '<%= project.build %>/js/adagios.min.js' : [
                            '<%= project.build %>/app.js',
                            '<%= project.build %>/components/config/config.js',
                            '<%= project.build %>/components/live/live.js',
                            '<%= project.build %>/components/live/notifications.js',
                            '<%= project.build %>/components/live/get_objects.js',
                            '<%= project.build %>/components/ng-justgage/ng-justgage.js',
                            '<%= project.build %>/components/filters/filters.js',
                            '<%= project.build %>/components/sidebar/sidebar.js',
                            '<%= project.build %>/components/topbar/topbar.js',
                            '<%= project.build %>/components/tactical/tactical.js',
                            '<%= project.build %>/components/tactical/status_overview/status_overview.js',
                            '<%= project.build %>/components/tactical/current_health/current_health.js',
                            '<%= project.build %>/components/tactical/top_alert_producers/top_alert_producers.js',
                            '<%= project.build %>/components/table/actionbar/actionbar.js',
                            '<%= project.build %>/components/table/table.js',
                            '<%= project.build %>/components/table/cell_duration/cell_duration.js',
                            '<%= project.build %>/components/table/cell_host/cell_host.js',
                            '<%= project.build %>/components/table/cell_last_check/cell_last_check.js',
                            '<%= project.build %>/components/table/cell_service_check/cell_service_check.js',
                            '<%= project.build %>/components/table/cell_hosts_host/cell_hosts_host.js',
                            '<%= project.build %>/components/table/cell_host_address/cell_host_address.js',
                            '<%= project.build %>/components/table/cell_host_status/cell_host_status.js',
                            '<%= project.build %>/components/host/host.js',
                            '<%= project.build %>/components/host/host_cpu/host_cpu.js',
                            '<%= project.build %>/components/host/host_info/host_info.js',
                            '<%= project.build %>/components/host/host_load/host_load.js',
                            '<%= project.build %>/components/host/host_main/host_main.js',
                            '<%= project.build %>/components/host/host_services_list/host_services_list.js',
                            '<%= project.build %>/components/service/service.js',
                            '<%= project.build %>/components/service/service_main/service_main.js',
                            '<%= project.build %>/components/service/service_info/service_info.js',
                            '<%= project.build %>/components/service/service_metrics/service_metrics.js',
                            '<%= project.build %>/routing_view/routing_view.js',
                            '<%= project.build %>/templates/dashboard/dashboard.js',
                            '<%= project.build %>/templates/single_table/single_table.js',
                            '<%= project.build %>/templates/host/host.js',
                            '<%= project.build %>/templates/service/service.js'
                        ]
                    }
                ],
                options: {
                    mangle: false,
                    beautify: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jslint');

    grunt.registerTask('default', ['watch', 'jslint', 'uglify']);
};
