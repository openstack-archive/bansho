'use strict';

angular.module('bansho.view.page', ['bansho.table', 'bansho.tactical'])
    .controller('PageCtrl', ['$scope', 'configManager',
        function ($scope, configManager) {
            var pageConfig = configManager.getConfigData($scope.viewName);

            $scope.components = pageConfig.components;
        }])

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
                        console.log(component.type)
                    });

                    $compile(element.contents())(scope);
                }
            }
        };
    }])

    .factory('directiveBuilder', function () {
        return function (type, index) {
            return "<bansho-" + type + " options=components[" + index + "] />";
        }
    });

