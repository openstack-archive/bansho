'use strict';

angular.module('bansho.tile')
    .directive('banshoTileServiceMain', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/custom_directive/container/service_main/service_main.html',
            controller: ['$scope', 'sharedData', 'templateManager', function ($scope, sharedData, templateManager, iframeUrl) {
                sharedData.getDataFromInputSource('statusServices', false,
                    templateManager.getAllPageParams(), function (service) {
                        $scope.service = service;
                    });
            }]
        };
    });
