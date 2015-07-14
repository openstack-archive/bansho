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
                    scope.components = attrs.components.split(',');
                    if (angular.isArray(scope.components)) {
                        angular.forEach(scope.components, function (component) {
                            var banshoDirective = "<bansho-actionbar-" + component + " table-id='[" + scope.tableId + "]'" + "/>";

                            element.append(banshoDirective);
                            $compile(element.contents())(scope);
                        });
                    }
                };
            }
        };
    });
