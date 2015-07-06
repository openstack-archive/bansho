'use strict';

angular.module('bansho.tactical.current_health', ['bansho.surveil',
                                                   'ngJustGage'])

    .controller('TacticalCurrentHealth', ['$scope', function ($scope) {
        angular.noop();
    }])

    .directive('banshoCurrentHealth', function () {
        return {
            restrict: 'A',
            templateUrl: 'components/tactical/current_health/current_health.html'
        };
    });
