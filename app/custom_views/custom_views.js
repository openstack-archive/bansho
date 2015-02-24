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

    .controller('CustomViewsCtrl', [ '$scope', '$routeParams', 'customViewsConfig',
        function ($scope, $routeParams, customViewsConfig) {
            var viewName = "";

            if (!!$routeParams.view) {
                viewName = $routeParams.view;
            } else {
                console.error("ERROR : 'view' GET parameter must be the custom view name");
                return;
            }

            $scope.customViewTitle = customViewsConfig[viewName].title;
            $scope.customViewCellsText = customViewsConfig[viewName].cells.text.join();
            $scope.customViewCellsName = customViewsConfig[viewName].cells.name.join();
            $scope.customViewApiName = customViewsConfig[viewName].apiName;
            $scope.customViewFilters = customViewsConfig[viewName].filters;
            $scope.customViewIsWrappable = customViewsConfig[viewName].isWrappable;
            $scope.customViewNoRepeatCell = customViewsConfig[viewName].noRepeatCell;
            $scope.customViewRefreshInterval = customViewsConfig[viewName].refreshInterval;
        }])

    .run(['readConfig', 'customViewsConfig', function (readConfig, customViewsConfig) {
        var viewsConfig = readConfig.data.customViewsConfig;

        angular.forEach(viewsConfig, function (config, view) {
            customViewsConfig[view] = config;
        });

    }]);
