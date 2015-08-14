'use strict';

angular.module('bansho.container')
    .directive('banshoServiceGraphs', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/container/service_graphs/service_graphs.html',
            link: function (scope) {
                scope.param = scope.$parent.param;
                scope.$parent.addDirectiveParamRequirements('service');
            }
        };
    });
