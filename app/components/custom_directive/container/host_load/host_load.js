'use strict';

angular.module('bansho.container')
    .directive('banshoHostLoad', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/custom_directive/container/host_load/host_load.html',
            link: function (scope) {
                scope.param = scope.$parent.param;
                scope.$parent.addDirectiveParamRequirements('statusHosts');
            }
        };
    });
