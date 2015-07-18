'use strict';

angular.module('bansho.host', ['bansho.datasource'])

    .directive('banshoHost', ['$routeParams',
        function () {
            return {
                restrict: 'E',
                scope: {
                    options: '='
                },
                templateUrl: 'components/directive/host/host.html',
                controller: ['$scope', '$element', '$routeParams', 'hostSource',
                    function ($scope, $element, $routeParams, hostSource) {
                        var hostname = $routeParams.host_name;
                        hostSource.setHostRefresh(hostname, 30000);

                        $scope.components = $scope.options.components;
                        angular.forEach($scope.components, function (component) {
                            component.attributes.hostname = hostname;
                        });
                }]
            };
        }]);
