'use strict';

angular.module('bansho.table')
    .directive('banshoHostStateIcon', function () {
        return {
            restrict: 'E',
            scope: {
                state: '='
            },
            templateUrl: 'components/directive/table/state_icon/state_icon.html',
            controller: ['$scope', function ($scope) {
                $scope.$watch('state', function (newValue) {
                    if ($scope.state === 'UP') {
                        $scope.stateClass = 'state--ok';
                    } else if ($scope.state === 'WARNING') {
                        $scope.stateClass = 'state--warning';
                    } else if ($scope.state === '') {
                        $scope.stateClass = '';
                    } else {
                        $scope.stateClass = 'state--error';
                    }
                });
            }]
        };
    })

    .directive('banshoServiceStateIcon', function () {
        return {
            restrict: 'E',
            scope: {
                state: '='
            },
            templateUrl: 'components/directive/table/state_icon/state_icon.html',
            controller: ['$scope', function ($scope) {
                $scope.$watch('state', function (newValue) {
                    if ($scope.state === 'OK') {
                        $scope.stateClass = 'state--ok';
                    } else if ($scope.state === 'WARNING') {
                        $scope.state = 'state--warning';
                    } else if ($scope.state === '') {
                        $scope.stateClass = '';
                    } else {
                        $scope.stateClass = 'state--error';
                    }
                });
            }]
        };
    });
