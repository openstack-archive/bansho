'use strict';

angular.module('adagios.host.main', [])

    .controller('HostMainCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .directive('adgHostMain', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/host/host_main/host_main.html'
        };
    });
