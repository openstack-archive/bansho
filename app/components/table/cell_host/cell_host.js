'use strict';

angular.module('adagios.table.cell_host', ['adagios.table'])

    .controller('CellHostCtrl', ['$scope', function ($scope) {
        $scope.cell_name = 'host';

        if ($scope.entry.host_state === 0) {
            $scope.state = 'state--ok';
        } else if ($scope.entry.host_state === 1) {
            $scope.state = 'state--warning';
        } else if ($scope.entry.host_state === "") {
            $scope.state = '';
        } else {
            $scope.state = 'state--error';
        }
    }])

    .run(['tableConfig', function (tableConfig) {
        tableConfig.cellToFieldsMap.host = ['host_state', 'host_name'];
        tableConfig.cellWrappableField.host = 'host_name';
    }]);
