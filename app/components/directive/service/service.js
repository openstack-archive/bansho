'use strict';

angular.module('bansho.service', ['bansho.datasource'])

    .directive('banshoService', function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/directive/service/service.html',
            controller: ['$scope', 'templateManager', 'surveilStatus', 'iframeUrl',
                function ($scope, templateManager, surveilStatus, iframeUrl) {
                    var hostname = templateManager.getPageParam('host_name'),
                        serviceDescription = templateManager.getPageParam('service_description');

                    $scope.param = {};
                    $scope.components = $scope.options.components;
                }]
            };
        });
