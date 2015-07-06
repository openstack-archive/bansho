'use strict';

angular.module('bansho.host.main', [])

    .controller('HostMainCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .directive('banshoHostMain', function () {
        return {
            restrict: 'A',
            compile: function (scope, element, attrs) {
                scope.host = attrs.host;
            },
            templateUrl: 'components/host/host_main/host_main.html'
        };
    });
