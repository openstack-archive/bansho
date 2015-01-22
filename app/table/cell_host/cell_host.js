'use strict';

angular.module('adagios.table.cell_host', [])

    .controller('CellHostCtrl', ['$scope', function ($scope) {
        return;
    }])

    .directive('cellHost', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: "table/cell_host/cell_host.html"
        };
    });
