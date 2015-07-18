'use strict';

angular.module('bansho.service')
    .directive('banshoServiceLive', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/service/service_live/service_live.html'
        };
    });
