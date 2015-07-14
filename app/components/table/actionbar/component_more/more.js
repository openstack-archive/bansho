'use strict';

angular.module('bansho.table.actionbar')
    .directive('banshoMore', function () {
        return {
            restrict: 'E',
            scope: {
                'tableId': '='
            },
            templateUrl: 'components/table/actionbar/component_more/more.html',
            controller: ['$scope', 'tables', function ($scope, tables) {}]
        };
    });
