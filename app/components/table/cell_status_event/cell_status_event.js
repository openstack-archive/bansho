'use strict';

angular.module('bansho.table.cell_status_event', ['bansho.table'])

    .controller('CellStatusEventCtrl', ['$scope', function ($scope) {
        console.log('test')
        $scope.isExpanded = false;
        $scope.toggleExpansion = function () {
            $scope.isExpanded = !$scope.isExpanded
        }
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.status_output = [
            'attempts',
            'contact',
            'notification_method',
            'notification_type',
            'state',
            'state_type'
        ];
    }]);
