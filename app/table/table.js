'use strict';

angular.module('adagios.table', ['ngRoute',
                                 'adagios.live',
                                 'adagios.table.cell_duration',
                                 'adagios.table.cell_host',
                                 'adagios.table.cell_last_check',
                                 'adagios.table.cell_service_check'
                                 ])

    .controller('TableCtrl', ['$scope', '$http', 'GetServices', function ($scope, $http, GetServices) {
        $scope.columns = ['host_name', 'last_check'];
        console.log(new GetServices($scope.columns)
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
