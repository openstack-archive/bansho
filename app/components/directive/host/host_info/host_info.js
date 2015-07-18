'use strict';

angular.module('bansho.host')
    .directive('banshoHostInfo', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/host/host_info/host_info.html',
            link: function (scope) {
                scope.param = scope.$parent.param;
            }
        };
    });
