'use strict';

angular.module('bansho.view.host', ['bansho.datasource'])

    .controller('HostViewCtrl', ['$scope', '$routeParams', 'configManager', 'templateManager',
        function ($scope, $routeParams, configManager, templateManager) {
            var hostname = $routeParams.host_name;

            $scope.components = configManager.getConfigData($scope.viewName).components;

            if (!hostname) {
                throw new Error("ERROR :'host_name' GET parameter must be set");
            } else {
                templateManager.setPageParam('hostname', hostname);
            }
        }]);
