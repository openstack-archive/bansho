'use strict';

angular.module('bansho.container')
    .directive('banshoServiceLive', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/custom_directive/container/service_live/service_live.html',
            link: function (scope) {
                scope.param = scope.$parent.param;
                scope.$parent.addDirectiveParamRequirements('service');
            }
        };
    });
