'use strict';

angular.module('bansho.table.cell_status_event_event_type', ['bansho.table'])

    .controller('CellStatusEventEventTypeCtrl', [function () {
        angular.noop();
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.event_type = ['event_type'];
    }]);
