'use strict';

angular.module('bansho.tile')
    .directive('banshoTileServiceInfo', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/custom_directive/tile/service_info/service_info.html',
            controller: ['$scope', 'sharedData', 'templateManager', function ($scope, sharedData, templateManager, iframeUrl) {
                sharedData.getDataFromInputSource('statusServices', false,
                    templateManager.getAllPageParams(), function (service) {
                        $scope.service = service;
                    });
            }]
        };
    });
