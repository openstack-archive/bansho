'use strict';

angular.module('bansho.table.cell_status_last_check', ['bansho.table'])

    .controller('CellStatusLastCheckCtrl', [function () {
        angular.noop();
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.last_check = ['last_check'];
    }]);
