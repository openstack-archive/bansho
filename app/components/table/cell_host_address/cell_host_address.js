'use strict';

angular.module('adagios.table.cell_host_address', ['adagios.table'])

    .controller('CellHostAddressCtrl', [function () {
        angular.noop();
    }])

    .run(['tableConfig', function (tableConfig) {
        tableConfig.cellToFieldsMap.host_address = ['host_address'];
    }]);
