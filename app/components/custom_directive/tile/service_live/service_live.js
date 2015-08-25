'use strict';

angular.module('bansho.tile')
    .directive('banshoTileServiceLive', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/custom_directive/tile/service_live/service_live.html',
            controller: ['$scope', 'sharedData', 'templateManager', function ($scope, sharedData, templateManager, iframeUrl) {
                sharedData.getDataFromInputSource('statusServices', false,
                    templateManager.getAllPageParams(), false, function (service) {
                        $scope.service = service;
                    });
            }]
        };
    });
