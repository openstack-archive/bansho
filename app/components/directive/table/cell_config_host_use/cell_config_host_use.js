'use strict';

angular.module('bansho.table.cell_config_host_use', ['bansho.table'])

    .controller('CellConfigHostUseCtrl', [function () {
        angular.noop();
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.config_host_use = ['use'];
    }]);
