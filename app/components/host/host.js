'use strict';

angular.module('bansho.host', ['bansho.live',
                                'bansho.host.main',
                                'bansho.host.load',
                                'bansho.host.cpu',
                                'bansho.host.info',
                                'bansho.host.services_list'])

    .value('hostConfig', {})

    .controller('HostCtrl', ['$scope', 'hostConfig', 'backendClient', function ($scope, hostConfig, backendClient) {
        var objectType = 'host',
            objectIdentifier = {};

        $scope.host = "test";

        objectIdentifier.host_name = hostConfig.hostName;
        $scope.hostName = hostConfig.hostName;
        $scope.data = {};

        backendClient.getHost(objectType, objectIdentifier).then(function (data) {
            $scope.host = data;
            $scope.data = data;

            backendClient.getServicesByHost($scope.hostName).success(function (data) {
                $scope.host.services = data;

                angular.forEach($scope.host.services, function (service, index) {
                    if (service.service_description === "cpu") {
                        $scope.host.cpu_service = service;
                    }
                });
            });
        });
    }])

    .directive('banshoHost', ['$http', '$compile', 'backendClient', 'hostConfig',
        function ($http, $compile, backendClient, hostConfig) {
            return {
                restrict: 'E',
                compile: function () {
                    return function (scope, element, attrs) {

                        var template = 'components/host/host.html';

                        if (!attrs.hostName) {
                            throw new Error('<bansho-host> "host-name" attribute must be defined');
                        }

                        hostConfig.hostName = {};
                        hostConfig.hostName = attrs.hostName;

                        $http.get(template, { cache: true })
                            .success(function (data) {
                                var elem = $compile(data)(scope);
                                element.append(elem);
                            });
                    };
                }
            };
        }]);
