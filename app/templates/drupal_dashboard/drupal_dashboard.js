"use strict";

angular.module("bansho.view.drupalDashboard", [])

    .controller("DrupalDashboardViewCtrl", ["$scope", "$routeParams", 'surveilStatus', 'configManager',
        function ($scope, $routeParams, surveilStatus, configManager) {
            var out_data = [],
                config = configManager.readConfig()[$routeParams.view],
                hostsMap = config.hostsMap,
                servicesMap = config.servicesMap,
                hideStatusOk = config.hideStatusOk,
                filters = {},
                hosts = [];

            angular.forEach(hostsMap, function (host_text, host_name) {
                hosts.push(host_name);
            });

            filters = {'is': {'host_name': hosts}};

            surveilStatus.getObjects([], filters, 'services').success(function (services) {

                for (var i = 0; i < services.length; i++) {
                    var index,
                        service = services[i],
                        service_out = {};

                    // Look if host_name already in the array
                    for (var j = 0; j < out_data.length; j++) {
                        if (service.host_name === out_data[j].host_name) {
                            index = j;
                            break;
                        }
                    }

                    if (index === undefined) {
                        out_data.push({'host_name': service.host_name});
                        index = out_data.length - 1;
                        out_data[index].host_text = hostsMap[service.host_name];
                    }

                    if (!('services' in out_data[index])) {
                        out_data[index].services = [];
                    }

                    out_data[index].services.push({});
                    service_out = out_data[index].services[out_data[index].services.length - 1];
                    service_out.description = servicesMap[service.service_description];

                    if (service.state === 'CRITICAL') {
                        service_out.state = 'btn-danger';
                    } else if (service.state === 'WARNING') {
                        service_out.state = 'btn-warning';
                    } else if (service.state === 'OK') {
                        if (hideStatusOk) {
                            service_out.hide = true;
                        }
                        service_out.state = 'btn-success';
                    } else {
                        service_out.state = '';
                    }
                }

                $scope.data = out_data;
            });
        }]);
