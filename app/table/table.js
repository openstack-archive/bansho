'use strict';

angular.module('adagios.table', ['ngRoute', 'adagios.table.entry', 'adagios.live'])

    .controller('TableCtrl', ['$scope', '$http', 'GetServices', function ($scope, $http, GetServices) {
        $scope.entries = GetServices;

    }])

    .directive('servicetable', function () {
        return {
            restrict: 'E',
            templateUrl: "table/table.html"
        };
    });

