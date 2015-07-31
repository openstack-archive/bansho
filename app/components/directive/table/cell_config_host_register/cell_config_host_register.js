'use strict';

angular.module('bansho.table.cell_config_host_register', ['bansho.table'])

    .controller('CellConfigHostRegisterCtrl', [function () {
        angular.noop();
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.config_host_register = ['register'];
    }]);
