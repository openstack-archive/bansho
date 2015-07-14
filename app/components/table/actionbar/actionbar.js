'use strict';

angular.module('bansho.table.actionbar', ['bansho.table', 'bansho.surveil', 'bansho.notifications'])
    .directive('banshoTableActionbar', function () {
        return {
            restrict: 'E',
            scope: {
                tableId: '='
            },
            templateUrl: 'components/table/actionbar/actionbar.html'
        };
    });
