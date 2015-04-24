'use strict';

angular.module('bansho.table.cell_last_check', ['bansho.table'])

    .controller('CellLastCheckCtrl', [function () {
        angular.noop();
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.last_check = ['last_check'];
    }]);
