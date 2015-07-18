'use strict';

angular.module('bansho.table.cell_status_host', ['bansho.table'])

    .controller('CellStatusHostCtrl', ['$scope', function ($scope) {
        $scope.cell_name = 'host';

        if ($scope.entry.state === 'UP') {
            $scope.state = 'state--ok';
        } else if ($scope.entry.state === 'WARNING') {
            $scope.state = 'state--warning';
        } else if ($scope.entry.state === '') {
            $scope.state = '';
        } else {
            $scope.state = 'state--error';
        }
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.status_host = ['state', 'host_name'];
        tableGlobalConfig.cellWrappableField.status_host = 'host_name';
    }]);
