'use strict';

angular.module('adagios.table.cell_host', ['adagios.table'])

    .controller('CellHostCtrl', ['$scope', function ($scope) {
        if ($scope.entry.host_state === 0) {
            $scope.state = 'state--ok';
        } else if ($scope.entry.host_state === 1) {
            $scope.state = 'state--warning';
        } else {
            $scope.state = 'state--error';
        }
    }])

    .run(['tableConfig', function (tableConfig) {
        tableConfig.cellToFieldsMap.host = [ 'host_state', 'host_name' ];

        tableConfig.cellToFunctionsMap.host = function(data) {
            if (data.host_state === 0) {
                data.state = 'state--ok';
            } else if (data.host_state === 1) {
                data.state = 'state--warning';
            } else {
                data.state = 'state--error';
            }
            return data
        };
    }]);
