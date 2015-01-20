'use strict';

angular.module('adagios.table', ['ngRoute', 'adagios.table.entry', 'adagios.live'])

    .controller('TableCtrl', ['$scope', '$http', 'GetServices', function ($scope, $http, GetServices) {
        console.log(new GetServices(['host_name', 'last_check'])
            .success(function (data) {
                $scope.entries = data;
            }));
    }])

    .directive('servicesTable', function () {
        return {
            restrict: 'E',
            templateUrl: "table/table.html"
        };
    });
