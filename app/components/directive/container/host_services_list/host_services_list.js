'use strict';

angular.module('bansho.container')
    .directive('banshoHostServicesList', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/container/host_services_list/host_services_list.html',
            link: function (scope) {
                scope.param = scope.$parent.param;
                scope.$parent.addDirectiveParamRequirements('host');
            }
        };
    });
