'use strict';

angular.module('bansho.table.state_icon', [])

    .controller('StateIconCtrl', ['$scope', function ($scope) {
        if ($scope.hostState === 'UP') {
            $scope.state = 'state--ok';
        } else if ($scope.hostState === 'WARNING') {
            $scope.state = 'state--warning';
        } else if ($scope.hostState === '') {
            $scope.state = '';
        } else {
            $scope.state = 'state--error';
        }
    }])

    .directive('banshoTableStateIcon', function () {
        return {
            restrict: 'E',
            link: function (scope, element, attrs) {
                console.log(attrs)
                scope.hostState = attrs.hostState;
            },
            templateUrl: 'components/table/state_icon/state_icon.html',
            controller: 'StateIconCtrl'
        };
    });
