
'use strict';

angular.module('adagios.view.host', ['adagios.live'])

    .controller('HostViewCtrl', ['$http', '$scope', '$routeParams', 'getObjectId', 'getObjectById', 'addObjectToScope',
        function ($http, $scope, $routeParams, getObjectId, getObjectById, addObjectToScope) {

            var objectIdentifier = {},
                objectType = 'host';

            if (!!$routeParams.host_name) {
                objectIdentifier.host_name = $routeParams.host_name;
            } else {
                throw new Error("ERROR :'host_name' GET parameter must be set");
            }

            $scope.data = {};
            addObjectToScope(objectType, objectIdentifier, $scope);
        }]);
