'use strict';

angular.module('bansho')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view'});
    }])

    //Reinitialise objects on url change
    .run(['$rootScope', 'templateManager', 'sharedData', 'reinitDrupalTiles', 'reinitDrupalInfo', 'componentsConfig',
        function ($rootScope, templateManager, sharedData, reinitDrupalTiles, reinitDrupalInfo, componentsConfig) {
            componentsConfig.load();
            $rootScope.$on('$locationChangeStart', function () {
                sharedData.clear(false);
                templateManager.clearIntervals(false);
                reinitDrupalTiles();
                reinitDrupalInfo();
            });
        }
    ]);
