'use strict';

angular.module('bansho.hostTree', ['bansho.datasource'])

    .directive('banshoHostTree', function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/directive/host_tree/host_tree.html',
            controller: ['$scope', 'sharedData',
                function ($scope, sharedData) {
                    $scope.sources = {};
                    angular.forEach($scope.options.attributes.inputSource, function (source) {
                        $scope.sources[source] = sharedData.getDataFromInputSource(source, function (data) {
                            $scope.sources[source] = data;
                        });
                    });
                    $scope.components = $scope.options.components;
                }]
        };
    });
