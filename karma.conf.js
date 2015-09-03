'use strict';

module.exports = function (config) {
    config.set({

        basePath : './',

        files : [
            'app/bower_components/jquery/dist/jquery.min.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-animate/angular-animate.min.js',
            'app/bower_components/angular-aria/angular-aria.min.js',
            'app/bower_components/angular-cookies/angular-cookies.js',
            'app/bower_components/angular-filter/dist/angular-filter.min.js',
            'app/bower_components/angular-material/angular-material.min.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/components/ng-justgage/ng-justgage.directive.js',
            'app/app.js',
            'app/**/*.module.js',
            'app/**/*.filter.js',
            'app/**/*.service.js',
            'app/**/*.factory.js',
            'app/**/*.directive.js',
            'app/**/*.config.js',
            'app/**/*.controller.js',
            'app/**/*.spec.js'
        ],

        exclude: [
        ],

        // test results reporter to use
        reporters: ['progress'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        logLevel: config.LOG_INFO,

        autoWatch : false,

        frameworks: ['jasmine'],

        browsers : ['PhantomJS'],

        singleRun: true
        //,

        //plugins : [
        //    'karma-chrome-launcher',
        //    'karma-firefox-launcher',
        //    'karma-jasmine',
        //    'karma-junit-reporter'
        //],
        //
        //junitReporter : {
        //    outputFile: 'test_out/unit.xml',
        //    suite: 'unit'
        //}

    });
};
