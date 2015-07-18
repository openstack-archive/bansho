'use strict';

angular.module('bansho.view.singleTable', ['ngRoute',
                                            'bansho.tactical.status_overview',
                                            'bansho.tactical.current_health',
                                            'bansho.tactical.top_alert_producers',
                                            'bansho.table'
                                           ])

    .controller('TablesCtrl', ['$scope', 'configManager',
        function ($scope, configManager) {
            var pageConfig = configManager.getConfigData($scope.viewName);

            $scope.pageTitle = pageConfig.title;
            $scope.refresh = pageConfig.refreshInterval;
            $scope.components = pageConfig.components;
        }])

    .directive('banshoComponents', ['$compile', 'directiveBuilder', function ($compile, directiveBuilder) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                components: '=',
                refresh: '='
            },
            template: "<span></span>",
            link: function (scope, element, attrs) {
                if (angular.isArray(scope.components)) {
                    angular.forEach(scope.components, function (component) {
                        element.append(directiveBuilder(
                            component.type,
                            component.attributes,
                            component.components
                        ));
                        $compile(element.contents())(scope);
                    });
                }
            }
        };
    }])

    .factory('directiveBuilder', [function () {
        return function (type, attributes, components) {
            var banshoDirective = "<bansho-" + type;

            angular.forEach(attributes, function (value, attr) {
                banshoDirective += " " + attr + "=" + JSON.stringify(value);
            });
            banshoDirective += " components='" + JSON.stringify(components) + "'/>";

            return banshoDirective;
        }
    }]);
