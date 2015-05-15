'use strict';

angular.module('bansho.host.main', [])

    .controller('HostMainCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .directive('banshoHostMain', function () {
        return {
            restrict: 'E',
            compile: function (scope, element, attrs) {
                scope.hostName = attrs.hostName;
            },
            templateUrl: 'components/host/host_main/host_main.html'
        };
    });
