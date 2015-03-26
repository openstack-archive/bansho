'use strict';

angular.module('adagios.host', ['adagios.live'])

    .value('hostConfig', {})

    .controller('HostCtrl', ['$scope', 'hostConfig', 'addObjectToScope', function ($scope, hostConfig, addObjectToScope) {
        var objectType = 'host',
            objectIdentifier = {};

        objectIdentifier.host_name = hostConfig.hostName;
        $scope.data = {};

        addObjectToScope(objectType, objectIdentifier, $scope);
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
