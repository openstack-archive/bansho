'use strict';

angular.module('bansho.tactical.status_overview', [])

    .controller('TacticalStatusOverViewCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .directive('banshoStatusOverview', function () {
        return {
            restrict: 'A',
            templateUrl: 'components/tactical/status_overview/status_overview.html'
        };
    });
