"use strict";

angular.module("bansho.view.service", [ "bansho.surveil" ])

    .controller("ServiceViewCtrl", ['$scope', '$routeParams', 'configManager', 'templateManager',
        function ($scope, $routeParams, configManager, templateManager) {
            var host_name = $routeParams.host_name,
                service_description = $routeParams.description;

            $scope.components = configManager.getConfigData($scope.viewName).components;

            if (!host_name || !service_description) {
                throw new Error("ERROR :'host_name' and 'description' GET parameters must be set");
            } else {
                templateManager.setPageParam('host_name', host_name);
                templateManager.setPageParam('service_description', service_description);
            }
        }]);
