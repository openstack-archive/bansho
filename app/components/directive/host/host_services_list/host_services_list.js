'use strict';

angular.module('bansho.host.services_list', [])
    .directive('banshoHostServicesList', function () {
        return {
            restrict: 'E',
            compile: function (scope, element, attrs) {
                scope.host = attrs.host;
            },
            templateUrl: '..//host_services_list/host_services_list.html'
        };
    });
