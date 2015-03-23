'use strict';

angular.module('adagios.view.object_view', ['ngRoute',
                                          'adagios.live'
                                         ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/object_view', {
            templateUrl: 'object_view/object_view.html',
            controller: 'ObjectViewCtrl'
        });
    }])

    .controller('ObjectViewCtrl', ['$http', '$scope', '$routeParams', 'getObjectId', 'getObjectById',
        function ($http, $scope, $routeParams, getObjectId, getObjectById) {

            var objectIdentifier = {},
                objectType = $routeParams.object_type,
                endpoints = {
                    "host" : "hosts",
                    "service" : "services"
                };

            var getIdentifier = function () {
                if (objectType === "host") {
                    objectIdentifier.host_name = $routeParams.host_name;
                } else if (objectType === "service") {
                    objectIdentifier.host_name = $routeParams.host_name;
                    objectIdentifier.description = $routeParams.description;
                } else {
                    throw new Error("ERROR : 'view' GET parameter must be the host");
                }
            };

            $scope.data = {};

            var getData = function () {

                var objectData = {},
                    url = "/rest/status/json/",
                    firstParameter = true;

                url += endpoints[objectType];
                url += "/?";
                angular.forEach(objectIdentifier, function (value, key){
                    if(!firstParameter){
                        url += "&";
                    }
                    url += key + "=" + objectIdentifier[key];
                    firstParameter = false;

                });

                $http.get(url)
                    .success(function (data) {
                        objectData.live = data[0];
                        getObjectId(objectType, objectIdentifier)
                            .success(function (data) {
                                var objectId = data[0].id;
                                $scope.data.id = objectId;
                                getObjectById(objectId)
                                    .success(function (data) {
                                        objectData.config = data;
                                        $scope.data = objectData;
                                    });
                            });
                    });
            };

            getIdentifier();
            getData(objectIdentifier);

        }]);

