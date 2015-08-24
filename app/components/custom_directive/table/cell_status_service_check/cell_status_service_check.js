'use strict';

angular.module('bansho.table')

    .controller('CellStatusServiceCheckCtrl', ['$scope', function ($scope) {
        if ($scope.entry.service_state === 'OK') {
            $scope.state = 'state--ok';
        } else if ($scope.entry.service_state === 'WARNING') {
            $scope.state = 'state--warning';
        } else {
            $scope.state = 'state--error';
        }
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.status_service_check = ['state', 'service_description', 'plugin_output'];
    }]);
