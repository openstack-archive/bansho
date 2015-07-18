'use strict';

angular.module('bansho.host')
    .directive('banshoHostMain', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/host/host_main/host_main.html',
            link: function (scope) {
                scope.param = scope.$parent.param;
            }
        };
    });
