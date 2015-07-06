'use strict';

angular.module('bansho.table.state_icon', [])
    .directive('banshoHostStateIcon', function () {
        return {
            restrict: 'A',
            scope: {
                state: '=state'
            },
            templateUrl: 'components/table/state_icon/state_icon.html',
            controller: ['$scope', function ($scope) {
                if ($scope.state === 'UP') {
                    $scope.stateClass = 'state--ok';
                } else if ($scope.state === 'WARNING') {
                    $scope.stateClass = 'state--warning';
                } else if ($scope.state === '') {
                    $scope.stateClass = '';
                } else {
                    $scope.stateClass = 'state--error';
                }
            }]
        };
    })

    .directive('banshoServiceStateIcon', function () {
        return {
            restrict: 'A',
            scope: {
                state: '=state'
            },
            templateUrl: 'components/table/state_icon/state_icon.html',
            controller: ['$scope', function ($scope) {
                if ($scope.state === 'OK') {
                    $scope.stateClass = 'state--ok';
                } else if ($scope.state === 'WARNING') {
                    $scope.state = 'state--warning';
                } else if ($scope.state === '') {
                    $scope.stateClass = '';
                } else {
                    $scope.stateClass = 'state--error';
                }
            }]
        };
    });
