'use strict';

angular.module('bansho.actionbar')
    .directive('banshoActionbarMore', [function () {
        return {
            restrict: 'E',
            scope: {
                'tableId': '='
            },
            templateUrl: 'components/custom_directive/actionbar/component_more/more.html',
            controller: ['$scope', 'datasource', function ($scope, datasource) {}]
        };
    }]);
