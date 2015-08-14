'use strict';

angular.module('bansho.container')
    .directive('banshoHostMain', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/container/host_main/host_main.html',
            link: function (scope) {
                scope.param = scope.$parent.param;
                scope.$parent.addDirectiveParamRequirements('host');
            }
        };
    });
