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
    'bansho.customDirective',
    'bansho.drupal',
    'bansho.drupal.tile',
    'bansho.drupal.info',
    'bansho.view',
    'bansho.view.page',
    'bansho.view.drupalDashboard',
    'bansho.view.drupal',
    'bansho.grafana'
])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view'});
    }])

    // Reinitialise objects on url change
    .run(['$rootScope', 'templateManager', 'sharedData', 'reinitDrupalTiles', 'reinitDrupalInfo', 'componentsConfig',
        function ($rootScope, templateManager, sharedData, reinitDrupalTiles, reinitDrupalInfo, componentsConfig) {
            componentsConfig.load();
            $rootScope.$on('$locationChangeStart', function () {
                sharedData.clear();
                templateManager.clearIntervals();
                reinitDrupalTiles();
                reinitDrupalInfo();
            });
        }]);
