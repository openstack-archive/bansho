'use strict';

angular.module('bansho.tabpanel', [])
    .directive('banshoTabpanel', ['$compile', 'directiveBuilder', function ($compile, directiveBuilder) {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/tabpanel/tabpanel.html',
            scope: {
                options: '='
            },
            link: function (scope, element) {
                scope.tabpanel = scope.options.attributes.tabtspanel;

                scope.currentPanel = 0;
                scope.setIsShown = function (index) {
                    scope.currentPanel = index;
                };
            }
        };
    }])

    .directive('banshoPanel', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/tabpanel/panel.html',
            scope: {
                  options: '='
            }
        };
    });
