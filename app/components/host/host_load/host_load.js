'use strict';

angular.module('bansho.host.load', [])
    .directive('banshoHostLoad', function () {
        return {
            restrict: 'E',
            compile: function (scope, element, attrs) {
                scope.host = attrs.host;
            },
            templateUrl: 'components/host/host_load/host_load.html'
        };
    });
