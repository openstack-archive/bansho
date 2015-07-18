'use strict';

angular.module('bansho.table.cell_status_event_time', ['bansho.table'])

    .controller('CellStatusEventTime', [function () {
        angular.noop();
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.status_time = ['time'];
    }]);
