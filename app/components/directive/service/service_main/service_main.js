'use strict';

angular.module('bansho.service')
    .directive('banshoServiceMain', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/service/service_main/service_main.html',
            link: function (scope) {
                scope.param = scope.$parent.param;
            }
        };
    });
