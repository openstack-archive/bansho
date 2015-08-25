'use strict';

angular.module('bansho.tile')
    .directive('banshoTileHostMain', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/custom_directive/container/host_main/host_main.html',
            controller: ['$scope', 'sharedData', 'templateManager', function (scope, sharedData, templateManager) {
                scope.host = sharedData.getDataFromInputSource('statusHosts', false,
                    templateManager.getAllPageParams(), function (host) {
                        scope.host = host;
                    });
            }]
        };
    });
