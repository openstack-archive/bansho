'use strict';

angular.module('adagios.service', ['adagios.live',
                                   'adagios.service.main',
                                   'adagios.service.info',
                                   'adagios.service.metrics'])

    .value('serviceConfig', {})

    .controller('ServiceCtrl', ['$scope', 'serviceConfig', 'getService',
        function ($scope, serviceConfig, getService) {
            var hostName = serviceConfig.hostName,
                description = serviceConfig.description;

            getService(hostName, description).success(function (data) {
                $scope.data = data;
            });
        }])

    .directive('adgService', ['$http', '$compile', 'serviceConfig',
        function ($http, $compile, serviceConfig) {
            return {
                restrict: 'E',
                compile: function () {
                    return function (scope, element, attrs) {

                        var template = 'components/service/service.html';

                        if (!attrs.hostName && !!attrs.description) {
                            throw new Error('<adg-service> "host-name" and "description" attributes must be defined');
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
