'use strict';

angular.module('bansho.table.cell_config_host_register', ['bansho.table'])

    .controller('CellConfigHostRegisterCtrl', ['$scope', function ($scope) {
        if ($scope.register === 0) {
            $scope.activityClass = 'fa-times-circle-o';
        } else {
            $scope.activityClass = 'fa-check-circle-o';
        }
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.config_host_register = ['register'];
    }]);
