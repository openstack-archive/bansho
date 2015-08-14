'use strict';

angular.module('bansho.container')
    .directive('banshoServiceInfo', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/container/service_info/service_info.html',
            link: function (scope) {
                scope.param = scope.$parent.param;
                scope.$parent.addDirectiveParamRequirements('service');
            }
        };
    });
