'use strict';

angular.module('bansho.tile')
    .directive('banshoTileInfo', function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/custom_directive/container/info/info.html',
            controller: ['$scope', 'sharedData', 'templateManager', 'iframeUrl', function ($scope, sharedData, templateManager, iframeUrl) {
                $scope.title = $scope.options.attributes.title;
                sharedData.getDataFromInputSource($scope.options.attributes.inputSource, false,
                    templateManager.getAllPageParams(), function (data) {
                        $scope.data = data;
                    }
                );
            }]
        };
    });
