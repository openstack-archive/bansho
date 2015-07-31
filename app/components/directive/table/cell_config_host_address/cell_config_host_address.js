'use strict';

angular.module('bansho.table.cell_config_host_address', ['bansho.table'])

    .controller('CellConfigHostAddressCtrl', [function () {
        angular.noop();
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.config_host_address = ['address'];
    }]);
