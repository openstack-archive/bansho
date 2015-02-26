'use strict';

angular.module('adagios.table.actionbar', [])

    .controller('TableActionbarCtrl', [function () {
        angular.noop();
    }])

    .directive('adgTableActionbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/table/actionbar/actionbar.html'
        };
    });
