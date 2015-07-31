'use strict';

angular.module('bansho.table.cell_config_host', ['bansho.table'])

    .controller('CellConfigHostCtrl', ['$scope', function ($scope) {
        $scope.cell_name = 'host';
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.config_host = ['host_name'];
        tableGlobalConfig.cellWrappableField.config_host = 'host_name';
    }]);
