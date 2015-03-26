'use strict';

angular.module('adagios.host.cpu', [])

    .controller('TableCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .directive('adgHostCpu', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/host/host_cpu/host_cpu.html'
        };
    });
