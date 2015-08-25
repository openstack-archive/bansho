'use strict';

angular.module('bansho.tile')
    .directive('banshoTileServiceGraphs', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/custom_directive/container/service_graphs/service_graphs.html',
            controller: ['$scope', 'sharedData', 'templateManager', function ($scope, sharedData, templateManager, iframeUrl) {
                sharedData.getDataFromInputSource('statusServices', false,
                    templateManager.getAllPageParams(), function (service) {
                        $scope.service = service;
                    });
            }]
        };
    });
