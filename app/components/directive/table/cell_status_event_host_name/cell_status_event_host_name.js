'use strict';

angular.module('bansho.table.cell_status_event_host_name', ['bansho.table'])

    .controller('CellStatusEventTypeCtrl', [function () {
        angular.noop();
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.host_name = ['host_name'];
    }]);
