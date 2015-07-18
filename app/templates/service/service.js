"use strict";

angular.module("bansho.view.service", [ "bansho.surveil" ])

    .controller("ServiceViewCtrl", ['$scope', '$routeParams', 'configManager', 'pageParams',
        function ($scope, $routeParams, configManager, pageParams) {
            var host_name = $routeParams.host_name,
                service_description = $routeParams.description;

            $scope.components = configManager.getConfigData($scope.viewName).components;

            if (!host_name || !service_description) {
                throw new Error("ERROR :'host_name' and 'description' GET parameters must be set");
            } else {
                pageParams.host_name = host_name;
                pageParams.service_description = service_description;
            }
        }]);
