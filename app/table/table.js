'use strict';

angular.module('adagios.table', ['ngRoute',
                                 'ngSanitize',
                                 'adagios.live',
                                 'adagios.table.cell_duration',
                                 'adagios.table.cell_host',
                                 'adagios.table.cell_last_check',
                                 'adagios.table.cell_service_check'
                                 ])

    .controller('TableCtrl', ['$scope', '$sce', 'GetServices', function ($scope, $sce, GetServices) {
        $scope.cellTagMapping = {
            duration: $sce.trustAsHtml('<cell-duration></cell-duration>'),
            host_name: $sce.trustAsHtml('<cell-host></cell-host>'),
            last_check: $sce.trustAsHtml('<cell-last-check></cell-last-check>'),
            service_check: $sce.trustAsHtml('<service-check></service-check>')
        };
        $scope.columns = ['host_name', 'last_check'];

        console.log(new GetServices($scope.columns)
            .success(function (data) {
                $scope.entries = data;
            }));
    }])

    .directive('servicesTable', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'table/table.html'
        };
    })

    .directive('servicesEntry', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'table/table.html'
        };
    });
