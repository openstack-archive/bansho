'use strict';

angular.module('adagios.host', ['adagios.live',
                                'adagios.host.main',
                                'adagios.host.load',
                                'adagios.host.cpu',
                                'adagios.host.info',
                                'adagios.host.services_list'])

    .value('hostConfig', {})

    .controller('HostCtrl', ['$scope', 'hostConfig', 'getHost', function ($scope, hostConfig, getHost) {
        var objectType = 'host',
            objectIdentifier = {};

        objectIdentifier.host_name = hostConfig.hostName;
        $scope.hostName = hostConfig.hostName;
        $scope.data = {};

        getHost(objectType, objectIdentifier).then(function (data) {
            $scope.data = data;
        });
    }])

    .directive('adgHost', ['$http', '$compile', 'hostConfig',
        function ($http, $compile, hostConfig) {
            return {
                restrict: 'E',
                compile: function () {
                    return function (scope, element, attrs) {

                        var template = 'components/host/host.html';

                        if (!attrs.hostName) {
                            throw new Error('<adg-host> "host-name" attribute must be defined');
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
