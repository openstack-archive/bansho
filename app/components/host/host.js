'use strict';

angular.module('adagios.host', [])

    .controller('TableCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .directive('adgHost', ['$http', '$compile',
        function ($http, $compile) {
            return {
                restrict: 'E',
                compile: function () {
                    return function (scope, element, attrs) {

                        var template = 'components/host/host.html',
                            conf;

                        if (!attrs.hostName || !attrs.modules) {
                            throw new Error('<adg-host> "host-name" and "modules" attributes must be defined');
                        }

                        $http.get(template, { cache: true })
                            .success(function (data) {
                                var elem = $compile(data)(scope);
                                element.append(elem);
                            });
                    };
                }
            };
        }]);
