'use strict';

angular.module('adagios.host.load', [])

    .controller('HostLoadCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .directive('adgHostLoad', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/host/host_load/host_load.html'
        };
    });
