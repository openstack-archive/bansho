'use strict';

angular.module('adagios.tactical.current_health', ['ngRoute', 'ngJustGage' ])

    .controller('TacticalCurrentHealth', ['$scope', '$http', function ($scope, $http) {
        $scope.hosts =  75.2;
        $scope.services = 94.4;
    }])

    .directive('adgCurrentHealth', function () {
        return {
            restrict: 'E',
            templateUrl: "tactical/current_health/current_health.html"
        };
    });
