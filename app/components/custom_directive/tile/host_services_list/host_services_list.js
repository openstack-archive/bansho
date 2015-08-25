'use strict';

angular.module('bansho.tile')
    .directive('banshoTileHostServicesList', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/custom_directive/tile/host_services_list/host_services_list.html',
            controller: ['$scope', 'sharedData', 'templateManager', 'iframeUrl', function ($scope, sharedData, templateManager, iframeUrl) {
                sharedData.getDataFromInputSource('statusServices', false,
                    templateManager.getAllPageParams(), function (services) {
                        $scope.services = [];
                        angular.forEach(services, function (service) {
                            console.log('service.service_service_description ')
                            console.log(service.service_service_description)
                            if (service.service_service_description !== 'load' &&
                                service.service_service_description !== 'cpu') {
                                $scope.services.push(service);
                            }
                        });
                    });
            }]
        };
    });
