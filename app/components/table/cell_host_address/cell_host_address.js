'use strict';

angular.module('adagios.table.cell_host_address', ['adagios.table'])

    .controller('CellHostAddressCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .run(['tableConfig', function (tableConfig) {
        tableConfig.cellToFieldsMap.host_address = ['host_address'];
    }]);
