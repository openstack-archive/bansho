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
            $scope.components = pageConfig.components
        }])

    .directive('banshoComponents', function ($compile) {
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
                        var banshoDirective = "<bansho-table-" + component.type + " table-id='" + component.config.tableId + "'",
                            config = component.config;

                        if (component.type === "table") {
                            banshoDirective +=
                                " cells-name='[" + config.cells.name + "]'" +
                                " cells-text='[" + config.cells.text + "]'" +
                                " input-source='" + config.inputSource + "'" +
                                " is-wrappable='" + config.isWrappable + "'" +
                                " no-repeat-cell='" + config.noRepeatCell + "'" +
                                " check-column='" + config.checkColumn + "'" +
                                " header-follow='" + config.headerFollow + "'" +
                                " refresh-interval='" + scope.refresh + "'";
                        }

                        banshoDirective += "/>";

                        element.append(banshoDirective);
                        $compile(element.contents())(scope);
                    });
                }
            }
        }
    });
