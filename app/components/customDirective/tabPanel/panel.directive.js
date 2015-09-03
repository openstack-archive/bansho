angular.module('bansho.customDirective.tabpanel')
    .directive('banshoPanel', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/customDirective/tabPanel/panel.html',
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
