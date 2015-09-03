angular.module('bansho.customDirective')
    .directive('banshoComponents', ['$compile', 'directiveBuilder', function ($compile, directiveBuilder) {
        return {
            restrict: "E",
            scope: {
                components: '='
            },
            link: function (scope, element) {
                if (angular.isArray(scope.components)) {
                    angular.forEach(scope.components, function (component, index) {
                        element.append(directiveBuilder(component.type, index));
                    });

                    $compile(element.contents())(scope);
                }
            }
        };
    }]);

