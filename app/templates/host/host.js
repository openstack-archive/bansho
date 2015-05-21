'use strict';

angular.module('bansho.view.host', ['bansho.surveil'])

    .controller('HostViewCtrl', ['$http', '$scope', '$routeParams',
        function ($http, $scope, $routeParams) {
            if (!!$routeParams.host_name) {
                $scope.hostName = $routeParams.host_name;
            } else {
                throw new Error("ERROR :'host_name' GET parameter must be set");
            }
        }]);
