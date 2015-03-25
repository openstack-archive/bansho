'use strict';

angular.module('adagios.table.cell_last_check', ['adagios.table'])

    .controller('CellLastCheckCtrl', [function () {
        angular.noop();
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.last_check = ['last_check'];
    }]);
