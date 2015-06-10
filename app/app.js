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
    'bansho.drupal',
    'bansho.drupal.tile',
    'bansho.drupal.info',
    'bansho.view',
    'bansho.view.dashboard',
    'bansho.view.singleTable',
    'bansho.view.host',
    'bansho.view.service',
    'bansho.view.drupalDashboard',
    'bansho.view.drupal',
    'bansho.grafana'
])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view'});
    }])

    // Reinitialise objects on url change
    .run(['$rootScope', 'promisesManager', 'reinitTables', 'reinitDrupalTiles', 'reinitDrupalInfo',
        function ($rootScope, promisesManager, reinitTables, reinitDrupalTiles, reinitDrupalInfo) {
            $rootScope.$on('$locationChangeStart', function () {
                reinitTables();
                reinitDrupalTiles();
                reinitDrupalInfo();
                promisesManager.clearAllPromises();
            });
        }]);
