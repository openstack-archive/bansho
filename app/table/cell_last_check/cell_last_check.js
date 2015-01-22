'use strict';

angular.module('adagios.table.cell_last_check', [])

    .controller('CellLastCheckCtrl', ['$scope', function ($scope) {
        return;
    }])

    .directive('cellLastCheck', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: "table/cell_last_check/cell_last_check.html"
        };
    });
