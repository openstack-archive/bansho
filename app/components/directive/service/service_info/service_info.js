'use strict';

angular.module('bansho.service')
    .directive('banshoServiceInfo', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/service/service_info/service_info.html'
        };
    });
