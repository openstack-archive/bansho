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
    'bansho.datasource',
    'bansho.directive',
    'bansho.host',
    'bansho.service',
    'bansho.drupal',
    'bansho.drupal.tile',
    'bansho.drupal.info',
    'bansho.view',
    'bansho.view.page',
    'bansho.view.host',
    'bansho.view.service',
    'bansho.view.config',
    'bansho.view.drupalDashboard',
    'bansho.view.drupal',
    'bansho.grafana'
])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view'});
    }])

    // Reinitialise objects on url change
    .run(['$rootScope', 'promisesManager', 'sharedData', 'reinitDrupalTiles', 'reinitDrupalInfo', 'componentsConfig',
        function ($rootScope, promisesManager, sharedData, reinitDrupalTiles, reinitDrupalInfo, componentsConfig) {
            componentsConfig.load();
            $rootScope.$on('$locationChangeStart', function () {
                reinitDrupalTiles();
                reinitDrupalInfo();
                promisesManager.clearAllPromises();
                sharedData.clear();
            });
        }]);
