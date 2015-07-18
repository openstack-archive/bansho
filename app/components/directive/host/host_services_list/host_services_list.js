'use strict';

angular.module('bansho.host')
    .directive('banshoHostServicesList', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/host/host_services_list/host_services_list.html'
        };
    });
