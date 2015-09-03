'use strict';

angular.module('bansho.customDirective.tile')
    .directive('banshoTileHostCpu', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/customDirective/tile/host_cpu/host_cpu.html',
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
