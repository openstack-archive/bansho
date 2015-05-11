'use strict';

angular.module('bansho.table.cell_host', ['bansho.table'])

    .controller('CellHostCtrl', ['$scope', function ($scope) {
        $scope.cell_name = 'host';

        if ($scope.entry.host_state === 'UP') {
            $scope.state = 'state--ok';
        } else if ($scope.entry.host_state === 'WARNING') {
            $scope.state = 'state--warning';
        } else if ($scope.entry.host_state === '') {
            $scope.state = '';
        } else {
            $scope.state = 'state--error';
        }
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.host = ['host_state', 'host_name'];
        tableGlobalConfig.cellWrappableField.host = 'host_name';
    }]);
