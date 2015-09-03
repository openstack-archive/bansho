'use strict';

angular.module('bansho.customDirective.tile')
    .directive('banshoTileServiceInfo', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/customDirective/tile/service_info/service_info.html',
            controller: ['$scope', 'sharedData', 'templateManager', function ($scope, sharedData, templateManager, iframeUrl) {
                sharedData.getDataFromInputSource('statusServices', false,
                    templateManager.getAllPageParams(), false, function (service) {
                        $scope.service = service;
                    });
            }]
        };
    });
