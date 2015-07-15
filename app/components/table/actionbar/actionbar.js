'use strict';

angular.module('bansho.table.actionbar', ['bansho.table', 'bansho.surveil', 'bansho.notifications'])
    .directive('banshoActionbar', function ($compile) {
        return {
            restrict: 'E',
            scope: {
                tableId: '='
            },
            templateUrl: 'components/table/actionbar/actionbar.html',
            compile: function () {
                return function (scope, element, attrs) {
                    scope.components = JSON.parse(attrs.components);
                    if (angular.isArray(scope.components)) {
                        angular.forEach(scope.components, function (component) {
                            var banshoDirective = "<bansho-actionbar-" + component.type + " table-id='[" + scope.tableId + "]' components='" + JSON.stringify(component.components) + "' />";

                            element.append(banshoDirective);
                            $compile(element.contents())(scope);
                        });
                    }
                };
            }
        };
    });
