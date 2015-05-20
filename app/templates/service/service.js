"use strict";

angular.module("bansho.view.service", [ "bansho.surveil" ])

    .controller("ServiceViewCtrl", [ "$scope", "$routeParams",
        function ($scope, $routeParams) {

            if (!$routeParams.host_name || !$routeParams.description) {
                throw new Error("ERROR :'host_name' and 'description' GET parameters must be set");
            }

            $scope.hostName = $routeParams.host_name;
            $scope.description = $routeParams.description;
        }]);
