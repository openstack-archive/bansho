'use strict';

angular.module('bansho.table.cell_status_host_address', ['bansho.table'])

    .controller('CellStatusHostAddressCtrl', [function () {
        angular.noop();
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.host_address = ['address'];
    }]);
