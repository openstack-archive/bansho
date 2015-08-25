'use strict';

angular.module('bansho.tile')
    .directive('banshoTileHostCpu', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/custom_directive/tile/host_cpu/host_cpu.html',
            controller: ['$scope', 'sharedData', 'templateManager', function ($scope, sharedData, templateManager) {
                sharedData.getDataFromInputSource('statusServices', false,
                    templateManager.getAllPageParams(), false, function (services) {
                        angular.forEach(services, function (service) {
                            if (service.service_service_description === 'cpu') {
                                $scope.cpu = service;
                            }
                        });
                    });
            }]
        };
    });
