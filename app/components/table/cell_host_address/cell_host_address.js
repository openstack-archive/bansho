'use strict';

angular.module('bansho.table.cell_host_address', ['bansho.table'])

    .controller('CellHostAddressCtrl', [function () {
        angular.noop();
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.host_address = ['address'];
    }]);
