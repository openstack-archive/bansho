'use strict';

angular.module('bansho.service')
    .directive('banshoServiceGraphs', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/service/service_graphs/service_graphs.html'
        };
    });
