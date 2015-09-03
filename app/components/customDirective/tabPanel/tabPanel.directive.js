'use strict';

angular.module('bansho.customDirective.tabpanel')
    .directive('banshoTabpanel', ['sharedData', function (sharedData) {
        return {
            restrict: 'E',
            templateUrl: 'components/customDirective/tabPanel/tabPanel.html',
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
                    panel.right = sharedData.getDataFromInputSource(panel.inputSource, true, null, false, function (data) {
                        panel.right = data;
                    });
                });
            }
        };
    }]);

