'use strict';

angular.module('bansho.service', ['bansho.live',
                                   'bansho.service.main',
                                   'bansho.service.info',
                                   'bansho.service.metrics'])

    .value('serviceConfig', {})

    .controller('ServiceCtrl', ['$scope', 'serviceConfig', 'backendClient',
        function ($scope, serviceConfig, backendClient) {
            var hostName = serviceConfig.hostName,
                description = serviceConfig.description;

            backendClient.getService(hostName, description).success(function (data) {
                $scope.service = data[0];
            });
        }])

    .directive('banshoService', ['$http', '$compile', 'serviceConfig',
        function ($http, $compile, serviceConfig) {
            return {
                restrict: 'E',
                compile: function () {
                    return function (scope, element, attrs) {

                        var template = 'components/service/service.html';

                        if (!attrs.hostName && !!attrs.description) {
                            throw new Error('<bansho-service> "host-name" and "description" attributes must be defined');
                        }

                        serviceConfig.hostName = '';
                        serviceConfig.hostName = attrs.hostName;

                        serviceConfig.description = '';
                        serviceConfig.description = attrs.description;

                        $http.get(template, { cache: true })
                            .success(function (data) {
                                var elem = $compile(data)(scope);
                                element.append(elem);
                            });
                    };
                }
            };
        }]);
