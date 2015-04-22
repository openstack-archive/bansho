'use strict';

angular.module('adagios.table.cell_host_address', ['adagios.table'])

    .controller('CellHostAddressCtrl', [function () {
        angular.noop();
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.host_address = ['address'];
    }]);
