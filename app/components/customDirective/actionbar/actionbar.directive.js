'use strict';

angular.module('bansho.customDirective.actionbar')
    .directive('banshoActionbar', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/customDirective/actionbar/actionbar.html',
            link: function (scope, element) {
                scope.datasourceId = scope.options.attributes.datasourceId;
                scope.components = scope.options.components;

                angular.forEach(scope.components, function (component) {
                    component.attributes.datasourceId = scope.datasourceId;
                });

                $compile(element.contents())(scope);
            }
        };
    }]);
