'use strict';

angular.module('adagios.host.main', [])

    .controller('HostMainCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .directive('banshoHostMain', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/host/host_main/host_main.html'
        };
    });
