'use strict';

angular.module('adagios.table.cell_service_check', [])

    .controller('CellServiceCheck', ['$scope', function ($scope) {
        return;
    }])

    .directive('cellServiceCheck', function () {
        return {
            restrict: 'E',
            templateUrl: "table/cell_service_check/cell_service_check.html"
        };
    });
