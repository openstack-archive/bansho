'use strict';

angular.module('bansho.tabpanel', ['bansho.table'])
    .directive('banshoTabpanel', ['$compile', 'directiveBuilder', function ($compile, directiveBuilder) {
        return {
            restrict: 'E',
            templateUrl: '/tabpanel.html',
            scope: {
                tabpanel: '='
            },
            compile: function () {
                return function (scope, element, attrs) {
                    var components = JSON.parse(attrs.components);
                    scope.currentPanel = 0;

                    if (angular.isArray(components)) {
                        angular.forEach(components, function (component, index) {
                            if (!component.attributes) {
                                component.attributes = {};
                            }
                            console.log(component.attributes)

                            var directive = directiveBuilder(
                                component.type,
                                component.attributes,
                                component.components
                            );

                            element.children().next().append('<div role="tabpanel"' +
                                'class="problems tab-pane" data-ng-class="{active: currentPanel === ' + index + '}"' +
                                '" id="openProblems" data-ng-show="currentPanel === ' + index + '">' +
                                directive + '</div>');
                        });
                    }

                    $compile(element.contents())(scope);
                }
            },
            controller: ['$scope', '$compile', '$element', function ($scope) {
                $scope.setIsShown = function (index) {
                    $scope.currentPanel = index;
                };
            }]
        };
    }])

    .directive('banshoPanel', ['$compile', 'directiveBuilder', function ($compile, directiveBuilder) {
        return {
            restrict: 'E',
            templateUrl: '/panel.html',
            scope: {
                  title: '='
            },
            compile: function () {
                return function (scope, element, attrs) {
                    var components = JSON.parse(attrs.components);
                    scope.title = attrs.title;

                    if (angular.isArray(components)) {
                        angular.forEach(components, function (component) {
                            if (!component.attributes) {
                                component.attributes = {};
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
