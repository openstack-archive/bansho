'use strict';

angular.module('bansho.tabpanel', [])
    .directive('banshoTabpanel', ['sharedData', function (sharedData) {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/tabpanel/tabpanel.html',
            scope: {
                options: '='
            },
            link: function (scope) {
                scope.navigation = scope.options.attributes.navigation;

                scope.currentPanel = Object.keys(scope.navigation)[0];
                scope.setIsShown = function (panelId) {
                    scope.currentPanel = panelId;
                };

                angular.forEach(scope.navigation, function (panel) {
                    panel.right = sharedData.getData(panel.provider, function (data) {
                        panel.right = data;
                    });
                });
            }
        };
    }])

    .directive('banshoPanel', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/tabpanel/panel.html',
            scope: {
                  options: '='
            },
            link: function (scope) {
                if (scope.$parent.$parent.currentPanel !== undefined) {
                    scope.parent = scope.$parent.$parent;
                } else {
                    scope.parent = {};
                    scope.parent.currentPanel = 0;

                    if (!scope.options.attributes) {
                        scope.options.attributes = {};
                    }
                    scope.options.attributes.panelId = 0;
                }
            }
        };
    });
