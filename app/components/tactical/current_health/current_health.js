'use strict';

angular.module('adagios.tactical.current_health', ['adagios.live',
                                                   'ngJustGage'])

    .controller('TacticalCurrentHealth', ['$scope', function ($scope) {
        angular.noop();
    }])

    .directive('adgCurrentHealth', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/tactical/current_health/current_health.html'
        };
    });
