'use strict';

angular.module('adagios.view.host', ['adagios.live'])

    .controller('HostViewCtrl', ['$http', '$scope', '$routeParams', 'getObjectId', 'getObjectById', 'addObjectToScope',
        function ($http, $scope, $routeParams, getObjectId, getObjectById, addObjectToScope) {
            if (!!$routeParams.host_name) {
                $scope.hostName = $routeParams.host_name;
            } else {
                throw new Error("ERROR :'host_name' GET parameter must be set");
            }
        }]);
