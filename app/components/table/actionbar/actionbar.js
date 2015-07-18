'use strict';

angular.module('bansho.table.actionbar', ['bansho.table', 'bansho.surveil', 'bansho.notifications'])
    .directive('banshoActionbar', ['$compile', 'directiveBuilder', function ($compile, directiveBuilder) {
        return {
            restrict: 'E',
            scope: {
                tableId: '='
            },
            templateUrl: 'components/table/actionbar/actionbar.html',
            compile: function () {
                return function (scope, element, attrs) {
                    var components = JSON.parse(attrs.components);
                    if (angular.isArray(components)) {
                        angular.forEach(components, function (component) {
                            if (!component.attributes) {
                                component.attributes = {}
                            }
                            component.attributes['table-id'] = scope.tableId;

                            var directive = directiveBuilder(
                                component.type,
                                component.attributes,
                                component.components
                            );

                            element.append(directive);
                            $compile(element.contents())(scope);
                        });
                    }
                };
            }
        };
    }]);
