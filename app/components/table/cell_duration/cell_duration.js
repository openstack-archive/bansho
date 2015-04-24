'use strict';

angular.module('bansho.table.cell_duration', ['bansho.table'])

    .controller('CellDurationCtrl', [function () {
        angular.noop();
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.duration = ['last_state_change'];
    }]);
