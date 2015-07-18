'use strict';

angular.module('bansho.host')
    .directive('banshoHostLoad', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/host/host_load/host_load.html',
            link: function (scope) {
                scope.param = scope.$parent.param;
            }
        };
    });
