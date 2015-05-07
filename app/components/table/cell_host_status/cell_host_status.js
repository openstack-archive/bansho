'use strict';

angular.module('bansho.table.cell_host_status', ['bansho.table'])

    .controller('CellHostStatusCtrl', ['$scope', function ($scope) {
        $scope.entry.host_status = "";
        $scope.alert_level = "";

        if ($scope.entry.last_check === 0) {
            $scope.alert_level = "alert alert-info";
            $scope.entry.host_status = "Pending";
        } else if ($scope.entry.host_state === 0) {
            $scope.alert_level = "alert alert-success";
            $scope.entry.host_status = "Host UP";
        } else {
            $scope.alert_level = "alert alert-danger";

            if ($scope.entry.parents.length === 0) {
                $scope.entry.host_status = "Host down";
            } else {
                $scope.entry.host_status = "Network outage";
            }
        }
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.host_status = ['state', 'last_check', 'parents'];
    }]);
