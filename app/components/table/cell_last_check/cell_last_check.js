'use strict';

angular.module('adagios.table.cell_last_check', ['adagios.table'])

    .controller('CellLastCheckCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .run(['tableConfig', function (tableConfig) {
        tableConfig.cellToFieldsMap.last_check = ['last_check'];
    }]);
