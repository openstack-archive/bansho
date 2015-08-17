'use strict';

angular.module('bansho.table.cell_status_host_status', ['bansho.table'])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.status_host_status = ['state', 'last_check', 'parents'];
    }]);