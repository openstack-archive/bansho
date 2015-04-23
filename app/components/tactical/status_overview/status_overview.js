'use strict';

angular.module('adagios.tactical.status_overview', [])

    .controller('TacticalStatusOverViewCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .directive('adgStatusOverview', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/tactical/status_overview/status_overview.html'
        };
    });
