'use strict';

angular.module('bansho.table.cell_status_service_check', ['bansho.table'])

    .controller('CellStatusServiceCheckCtrl', ['$scope', function ($scope) {
        if ($scope.entry.state === 'OK') {
            $scope.state = 'state--ok';
        } else if ($scope.entry.state === 'WARNING') {
            $scope.state = 'state--warning';
        } else {
            $scope.state = 'state--error';
        }
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.service_check = ['state', 'service_description', 'plugin_output'];
    }]);
