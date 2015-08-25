'use strict';

angular.module('bansho.tile')
    .directive('banshoTileHostLive', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/custom_directive/tile/host_live/host_live.html',
            controller: ['$scope', 'sharedData', 'templateManager', function (scope, sharedData, templateManager) {
                scope.host = sharedData.getDataFromInputSource('statusHosts', false,
                    templateManager.getAllPageParams(), false, function (host) {
                        scope.host = host;
                    });
            }]
        };
    });
