'use strict';

angular.module('bansho.container', [])
    .directive('banshoContainer', function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/custom_directive/container/container.html',
            controller: ['$scope', 'componentsConfig', 'templateManager', 'sharedData', 'iframeUrl',
                function ($scope, componentsConfig, templateManager, sharedData, iframeUrl) {
                    $scope.addDirectiveParamRequirements = function (inputSource) {
                    //    if ($scope.param[inputSource] === undefined) {
                    //        var inputSourceConfiguration = componentsConfig.getInputSource(inputSource);
                    //        if (inputSourceConfiguration.provider === 'status') {
                    //            surveilStatus.getDataFromEndpoint([], inputSourceConfiguration.endpoint, templateManager.getAllPageParams())
                    //                .then(function (data) {
                    //                    $scope.param[inputSource] = data[0];
                    //                });
                    //
                    //        } else {
                    //            surveilConfig.getDataFromEndpoint([], inputSourceConfiguration.endpoint, templateManager.getAllPageParams())
                    //                .then(function (data) {
                    //                    $scope.param[inputSource] = data[0];
                    //                });
                    //        }
                    //    }
                    };



                    $scope.components = $scope.options.components;
                }]
        };
    });
