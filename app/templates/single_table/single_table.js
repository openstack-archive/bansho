/*global jQuery */

'use strict';

angular.module('bansho.view.singleTable', ['ngRoute',
                                            'bansho.tactical.status_overview',
                                            'bansho.tactical.current_health',
                                            'bansho.tactical.top_alert_producers',
                                            'bansho.table'
                                           ])

    .value('singleTableConfig', {})

    .controller('SingleTableCtrl', ['$scope', '$routeParams', 'singleTableConfig', 'TableConfigObj', 'configManager',
        function ($scope, $routeParams, singleTableConfig, TableConfigObj, configManager) {
            var viewName = $scope.viewName;

            if (jQuery.isEmptyObject(singleTableConfig)) {
                configManager.loadByTemplate('single_table', singleTableConfig);
            }

            $scope.tableConfig = new TableConfigObj(singleTableConfig[viewName].components[0].config);
            $scope.singleTableTitle = singleTableConfig[viewName].title;
            $scope.singleTableRefreshInterval = singleTableConfig[viewName].refreshInterval;
        }]);
