'use strict';

angular.module('bansho.table.cell_config_host_name', ['bansho.table'])

    .controller('CellConfigHostNameCtrl', [function () {
        angular.noop();
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.config_host_use = ['name'];
    }]);
