'use strict';

angular.module('bansho.table.cell_status_duration', ['bansho.table'])

    .controller('CellStatusDurationCtrl', [function () {
        angular.noop();
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.status_duration = ['last_state_change'];
    }]);
