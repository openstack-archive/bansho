'use strict';

angular.module('bansho', [
    'ngRoute',
    'ngCookies',
    'angular.filter',
    'bansho.config',
    'bansho.authentication',
    'bansho.topbar',
    'bansho.sidebar',
    'bansho.surveil',
    'bansho.datasource',
    'bansho.directive',
    'bansho.drupal',
    'bansho.drupal.tile',
    'bansho.drupal.info',
    'bansho.view',
    'bansho.view.page',
    'bansho.view.config',
    'bansho.view.drupalDashboard',
    'bansho.view.drupal',
    'bansho.grafana'
])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view'});
    }])

    // Reinitialise objects on url change
    .run(['$rootScope', 'templateManager', 'reinitDrupalTiles', 'reinitDrupalInfo', 'componentsConfig',
        function ($rootScope, templateManager, reinitDrupalTiles, reinitDrupalInfo, componentsConfig) {
            componentsConfig.load();
            $rootScope.$on('$locationChangeStart', function () {
                templateManager.clearIntervals();
                reinitDrupalTiles();
                reinitDrupalInfo();
            });
        }]);
