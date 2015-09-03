'use strict';

angular.module('bansho.customDirective.tile')
    .directive('banshoTileInfo', function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/customDirective/tile/info/info.html',
            controller: ['$scope', 'sharedData', 'templateManager', 'iframeUrl', function ($scope, sharedData, templateManager, iframeUrl) {
                $scope.title = $scope.options.attributes.title;
                sharedData.getDataFromInputSource($scope.options.attributes.inputSource, false,
                    templateManager.getAllPageParams(), false, function (data) {
                        $scope.data = data;
                    }
                );
            }]
        };
    });
