'use strict';

angular.module('bansho.customDirective.hostTree')
    .directive('banshoHostTree', function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/customDirective/hostTree/hostTree.html',
            controller: ['$scope', 'sharedData',
                function ($scope, sharedData) {
                    $scope.sources = {};
                    angular.forEach($scope.options.attributes.inputSource, function (source) {
                        $scope.sources[source] = sharedData.getDataFromInputSource(source, false, null, false, function (data) {
                            $scope.sources[source] = data;
                        });
                    });
                    $scope.components = $scope.options.components;
                }]
        };
    });
