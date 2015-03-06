'use strict';

angular.module('adagios.view.custom', ['ngRoute',
                                       'adagios.tactical.status_overview',
                                       'adagios.tactical.current_health',
                                       'adagios.tactical.top_alert_producers',
                                       'adagios.table'
                                      ])

    .value('customViewsConfig', {})

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/customViews', {
            templateUrl: 'custom_views/custom_views.html',
            controller: 'CustomViewsCtrl'
        });
    }])

    .controller('CustomViewsCtrl', [ '$scope', '$routeParams', 'customViewsConfig', 'tableConfig',
        function ($scope, $routeParams, customViewsConfig, tableConfig) {
            var viewName = "";

            tableConfig.index = 0;

            if (!!$routeParams.view) {
                viewName = $routeParams.view;
            } else {
                console.error("ERROR : 'view' GET parameter must be the custom view name");
                return;
            }

            function TableConfig(config) {
                this.title = config.title;
                this.CellsText = config.cells.text.join();
                this.CellsName = config.cells.name.join();
                this.ApiName = config.apiName;
                this.Filters = config.filters;
                this.IsWrappable = config.isWrappable;
                this.NoRepeatCell = config.noRepeatCell;
            }

            $scope.tableConfig = new TableConfig(customViewsConfig[viewName].components[0].config);

            $scope.singleTableTitle = customViewsConfig[viewName].title;
            $scope.singleTableRefreshInterval = customViewsConfig[viewName].refreshInterval;
        }])

    .run(['readConfig', 'customViewsConfig', function (readConfig, customViewsConfig) {
        var viewsConfig = readConfig.data;

        angular.forEach(viewsConfig, function (config, view) {
            if (config.template === "singleTable") {
                customViewsConfig[view] = config;
            }
        });
    }]);
