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
                angular.copy(scope.options.attributes.navigation, scope.navigation);

                scope.currentPanel = 0;
                scope.setIsShown = function (index) {
                    scope.currentPanel = index;
                };

                angular.forEach(scope.navigation, function (panel, index) {
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
                console.log('scope ')
                console.log(scope)
                if (scope.$parent.$parent.currentPanel !== undefined) {
                    scope.parent = scope.$parent.$parent;
                } else {
                    scope.parent = {};
                    scope.parent.currentPanel = 0;
                    scope.index = 0;
                }
            }
        };
    });
