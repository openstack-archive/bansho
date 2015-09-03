'use strict';

angular.module('bansho.customDirective.tactical')
    .directive('banshoStatusOverview', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/customDirective/tactical/statusOverview/statusOverview.html'
        };
    });
