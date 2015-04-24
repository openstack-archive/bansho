'use strict';

angular.module('bansho.view.singleTable', ['ngRoute',
                                            'bansho.tactical.status_overview',
                                            'bansho.tactical.current_health',
                                            'bansho.tactical.top_alert_producers',
                                            'bansho.table'
                                           ])

    .value('singleTableConfig', {})

    .controller('SingleTableCtrl', ['$scope', '$routeParams', 'singleTableConfig', 'TableConfigObj',
        function ($scope, $routeParams, singleTableConfig, TableConfigObj) {
            var viewName = $scope.viewName;

            $scope.tableConfig = new TableConfigObj(singleTableConfig[viewName].components[0].config);

            $scope.singleTableTitle = singleTableConfig[viewName].title;
            $scope.singleTableRefreshInterval = singleTableConfig[viewName].refreshInterval;
        }])

    .run(['readConfig', 'singleTableConfig', function (readConfig, singleTableConfig) {
        var viewsConfig = readConfig.data;

        angular.forEach(viewsConfig, function (config, view) {
            if (config.template === 'single_table') {
                singleTableConfig[view] = config;
            }
        });
    }]);
