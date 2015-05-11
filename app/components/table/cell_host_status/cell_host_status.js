'use strict';

angular.module('bansho.table.cell_host_status', ['bansho.table'])

    .controller('CellHostStatusCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.host_status = ['state', 'last_check', 'parents'];
    }]);
