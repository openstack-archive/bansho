'use strict';

angular.module('bansho.host.info', [])

    .controller('HostInfoCtrl', ['$scope', function ($scope) {
        $scope.active_checks = ($scope.data.live.active_checks_enabled === '1') ? 'Enabled' : 'Disabled';
        $scope.notifications_enabled = ($scope.data.config.notifications_enabled === '1') ? 'Enabled' : 'Disabled';
        $scope.event_handler_enabled = ($scope.data.config.event_handler_enabled === '1') ? 'Enabled' : 'Disabled';
        $scope.flap_detection_enabled = ($scope.data.config.flap_detection_enabled === '1') ? 'Enabled' : 'Disabled';
    }])

    .directive('banshoHostInfo', function () {
        return {
            restrict: 'A',
            templateUrl: 'components/host/host_info/host_info.html'
        };
    });
