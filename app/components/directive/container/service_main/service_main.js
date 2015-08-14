'use strict';

angular.module('bansho.container')
    .directive('banshoServiceMain', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/container/service_main/service_main.html',
            link: function (scope) {
                scope.param = scope.$parent.param;
                scope.$parent.addDirectiveParamRequirements('service');
            }
        };
    });
