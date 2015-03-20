'use strict';

angular.module('adagios.view.host_view', ['ngRoute',
                                          'adagios.live'
                                         ])

    .value('hostViewConfig', {})

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/host_view', {
            templateUrl: 'host_view/host_view.html',
            controller: 'HostViewCtrl'
        });
    }])

    .controller('HostViewCtrl', ['$http', '$scope', '$routeParams', 'getObjectId', 'getHostById',
        function ($http, $scope, $routeParams, getObjectId, getHostById) {

            $scope.data = {};

            if (!!$routeParams.host) {
                $scope.hostName = $routeParams.host;
            } else {
                throw new Error("ERROR : 'view' GET parameter must be the host");
            }

            var getData = function (host) {

                var objectData = {}, objectId, objectType;

                $http.get('/rest/status/json/hosts/?host_name=' + host)
                    .success(function (data) {
                        $scope.data = objectData.live = data[0];
                    });

                objectType = 'host';
                getObjectId(objectType, host)
                    .success(function (data) {
                        objectId = data[0].id;
                        $scope.data.id = objectId;
                        getHostById(objectId)
                            .success(function (data) {
                                $scope.data.config = data;
                            });
                    });

            };

            getData($scope.hostName);
        }]);

