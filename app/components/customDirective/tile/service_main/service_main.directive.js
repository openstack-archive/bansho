'use strict';

angular.module('bansho.customDirective.tile')
    .directive('banshoTileServiceMain', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/customDirective/tile/service_main/service_main.html',
            controller: ['$scope', 'sharedData', 'templateManager', function ($scope, sharedData, templateManager, iframeUrl) {
                sharedData.getDataFromInputSource('statusServices', false,
                    templateManager.getAllPageParams(), false, function (service) {
                        $scope.service = service;
                    });
            }]
        };
    });
