'use strict';

angular.module('adagios.table.cell_hosts_host', ['adagios.table'])

    .controller('CellHostsHostCtrl', ['$scope', function ($scope) {
        if ($scope.entry.state === 0) {
            $scope.state = 'state--ok';
        } else if ($scope.entry.state === 1) {
            $scope.state = 'state--error';
        } else if ($scope.entry.state === "") {
            $scope.state = '';
        } else {
            $scope.state = 'state--unreachable';
        }
    }])

    .run(['tableConfig', function (tableConfig) {
        tableConfig.cellToFieldsMap.hosts_host = ['name', 'state'];
    }]);
