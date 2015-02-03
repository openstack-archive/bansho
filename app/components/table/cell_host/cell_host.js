'use strict';

angular.module('adagios.table.cell_host', ['adagios.table'])

    .controller('CellHostCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .run(['tableConfig', function (tableConfig) {
        tableConfig.cellToFieldsMap.host = [ 'host_state', 'host_name' ];
    }]);
