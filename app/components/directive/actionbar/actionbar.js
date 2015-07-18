'use strict';

angular.module('bansho.actionbar', ['bansho.datasource', 'bansho.surveil', 'bansho.notifications'])
    .directive('banshoActionbar', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/directive/actionbar/actionbar.html',
            link: function (scope, element) {
                scope.tableId = scope.options.attributes.tableId;
                scope.components = scope.options.components;

                angular.forEach(scope.components, function (component) {
                    component.attributes.tableId = scope.tableId;
                });

                $compile(element.contents())(scope);
            }
        };
    }]);
