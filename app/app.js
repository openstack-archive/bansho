'use strict';

angular.module('bansho', [
    'ngRoute',
    'ngCookies',
    'angular.filter',
    'bansho.config',
    'bansho.authentication',
    'bansho.utils.promiseManager',
    'bansho.topbar',
    'bansho.sidebar',
    'bansho.surveil',
    'bansho.host',
    'bansho.service',
    'bansho.view',
    'bansho.view.dashboard',
    'bansho.view.singleTable',
    'bansho.view.host',
    'bansho.view.service',
    'bansho.view.drupalDashboard',
    'bansho.view.drupal'
])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view'});
    }])

    // Reinitialise objects on url change
    .run(['$rootScope', 'promisesManager', 'reinitTables', function ($rootScope, promisesManager, reinitTables) {
        $rootScope.$on('$locationChangeStart', function () {
            reinitTables();
            promisesManager.clearAllPromises();
        });
    }]);
