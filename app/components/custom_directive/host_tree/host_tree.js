'use strict';

angular.module('bansho.hostTree', ['bansho.datasource'])

    .directive('banshoHostTree', function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/custom_directive/host_tree/host_tree.html',
            controller: ['$scope', 'sharedData',
                function ($scope, sharedData) {
                    $scope.sources = {};
                    angular.forEach($scope.options.attributes.inputSource, function (source) {
                        $scope.sources[source] = sharedData.getDataFromInputSource(source, false, null, function (data) {
                            $scope.sources[source] = data;
                        });
                    });
                    $scope.components = $scope.options.components;
                }]
        };
    });
