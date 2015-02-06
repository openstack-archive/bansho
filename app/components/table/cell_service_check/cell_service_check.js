'use strict';

angular.module('adagios.table.cell_service_check', ['adagios.table'])

    .controller('CellServiceCheckCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .run(['tableConfig', function (tableConfig) {
        tableConfig.cellToFieldsMap.service_check = ['state', 'description', 'plugin_output'];
    }]);
