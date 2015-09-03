'use strict';

angular.module('bansho.customDirective.tile')
    .directive('banshoTileHostLive', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/customDirective/tile/host_live/host_live.html',
            controller: ['$scope', 'sharedData', 'templateManager', function (scope, sharedData, templateManager) {
                scope.host = sharedData.getDataFromInputSource('statusHosts', false,
                    templateManager.getAllPageParams(), false, function (host) {
                        scope.host = host;
                    });
            }]
        };
    });
