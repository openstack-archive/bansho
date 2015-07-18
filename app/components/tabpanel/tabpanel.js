'use strict';

angular.module('bansho.tabpanel', ['bansho.table'])
    .directive('banshoTabpanel', ['$compile', 'directiveBuilder', function ($compile, directiveBuilder) {
        return {
            restrict: 'E',
            templateUrl: 'components/tabpanel/tabpanel.html',
            scope: {
                "tabpanel": '='
            },
            compile: function () {
                return function (scope, element, attrs) {
                    var components = JSON.parse(attrs.components);
                    if (angular.isArray(components)) {
                        angular.forEach(components, function (component, index) {
                            if (!component.attributes) {
                                component.attributes = {}
                            }

                            console.log(attrs.tabpanel)
                            console.log(index)
                            component.attributes.panel = 'tet'

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
            },
            controller: ['$scope', function ($scope) {
                $scope.tabpanel[0].isShown = true;

                $scope.setIsShown = function (panel) {
                    angular.forEach($scope.tabpanel, function (panel) {
                        panel.isShown = false;
                    });

                    panel.isShown = true;
                }
            }]
        };
    }])

    .directive('banshoPanel', ['$compile', 'directiveBuilder', function ($compile, directiveBuilder) {
        return {
            restrict: 'E',
            scope: {
                'panel': '='
            },
            templateUrl: 'components/tabpanel/panel.html',
            compile: function () {
                return function (scope, element, attrs) {
                    console.log('teststestss')
                    console.log(attrs)
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

                            element.children().children().append(directive);
                        });
                    }

                    $compile(element.contents())(scope);
                };
            }
        };
    }]);
