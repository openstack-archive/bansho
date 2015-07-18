'use strict';

angular.module('bansho.tabpanel', ['bansho.table'])
    .directive('banshoTabpanel', ['$compile', 'directiveBuilder', function ($compile, directiveBuilder) {
        return {
            restrict: 'E',
            templateUrl: 'components/tabpanel/tabpanel.html',
            scope: {
                "panel": '='
            },
            compile: function () {
                return function (scope, element, attrs) {
                    var components = JSON.parse(attrs.components);
                    if (angular.isArray(components)) {
                        angular.forEach(components, function (component) {
                            if (!component.attributes) {
                                component.attributes = {}
                            }

                            var directive = directiveBuilder(
                                component.type,
                                component.attributes,
                                component.components
                            );

                            console.log(directive)
                            element.append(directive);
                        });

                        $compile(element.contents())(scope);
                    }
                };
            }
        };
    }])

    .directive('banshoPanel', ['$compile', 'directiveBuilder', function ($compile, directiveBuilder) {
        return {
            restrict: 'E',
            compile: function () {
                return function (scope, element, attrs) {
                    var components = JSON.parse(attrs.components);
                    element.append('<div class="tab-content"><div role="tabpanel" class="problems tab-pane active" id="' +
                        attrs.title + '">');

                    if (angular.isArray(components)) {
                        angular.forEach(components, function (component) {
                            if (!component.attributes) {
                                component.attributes = {}
                            }

                            var directive = directiveBuilder(
                                component.type,
                                component.attributes,
                                component.components
                            );

                            element.append(directive);
                        });
                    }

                    element.append('</div></div>');
                    $compile(element.contents())(scope);
                };
            }
        };
    }]);
