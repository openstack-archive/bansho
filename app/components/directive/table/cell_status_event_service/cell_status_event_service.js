'use strict';

angular.module('bansho.table.cell_status_event_service', ['bansho.table'])

    .controller('CellStatusEventServiceCtrl', [function () {
        angular.noop();
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.service_description = ['service_description'];
    }]);
