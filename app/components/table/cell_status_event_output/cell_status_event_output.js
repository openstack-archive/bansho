'use strict';

angular.module('bansho.table.cell_status_event_output', ['bansho.table'])

    .controller('CellStatusEventOutputCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.status_output = ['output'];
    }]);
