'use strict';

angular.module('bansho.container', [])
    .directive('banshoContainer', function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/directive/container/container.html',
            controller: ['$scope', 'templateManager', 'surveilStatus', 'surveilConfig', 'iframeUrl',
                function ($scope, templateManager, surveilStatus, surveilConfig, iframeUrl) {
                    $scope.param = { };

                    $scope.addDirectiveParamRequirements = function (param) {
                        if ($scope.param[param] === undefined) {
                            fillParams[param]();
                        }
                    };

                    var fillParams = {
                        "configBusinessImpactModulation": function () {
                            surveilConfig.getBusinessImpactModulation(templateManager.getPageParam('business_impact_modulation_name'))
                                .then(function (data) {
                                    $scope.param.configBusinessImpactModulation = data[0];
                                });
                        },
                        "configCheckModulation": function () {
                            surveilConfig.getCheckModulation(templateManager.getPageParam('checkmodulation_name'))
                                .then(function (data) {
                                    $scope.param.configCheckModulation = data[0];
                                });
                        },
                        "configContactGroup": function () {
                            surveilConfig.getContactGroup(templateManager.getPageParam('contactgroup_name'))
                                .then(function (data) {
                                    $scope.param.configContactGroup = data[0];
                                });
                        },
                        "configContact": function () {
                            surveilConfig.getContact(templateManager.getPageParam('contact_name'))
                                .then(function (data) {
                                    $scope.param.configContact = data[0];
                                });
                        },
                        "configHostGroup": function () {
                            surveilConfig.getHostGroup(templateManager.getPageParam('hostgroup_name'))
                                .then(function (data) {
                                    $scope.param.configHostGroup = data[0];
                                });
                        },
                        "configMacroModulation": function () {
                            surveilConfig.getMacroModulationName(templateManager.getPageParam('macromodulation_name'))
                                .then(function (data) {
                                    $scope.param.configMacroModulation = data[0];
                                });
                        },
                        "configNotificationWay": function () {
                            surveilConfig.getNotificationWay(templateManager.getPageParam('notificationway_name'))
                                .then(function (data) {
                                    $scope.param.configNotificationWay = data[0];
                                });
                        },
                        "configRealm": function () {
                            surveilConfig.getRealm(templateManager.getPageParam('realm_name'))
                                .then(function (data) {
                                    $scope.param.configRealm = data[0];
                                });
                        },
                        "configServiceGroup": function () {
                            surveilConfig.getServiceGroup(templateManager.getPageParam('servicegroup_name'))
                                .then(function (data) {
                                    $scope.param.configServiceGroup = data[0];
                                });
                        },
                        "configTimePeriod": function () {
                            surveilConfig.getTimePeriod(templateManager.getPageParam('timeperiod_name'))
                                .then(function (data) {
                                    $scope.param.configTimePeriod = data[0];
                                });
                        },
                        "configService": function () {
                            console.log('Hey, listen!')
                            surveilConfig.getService(templateManager.getPageParam('host_name'),templateManager.getPageParam('service_description'))
                                .then(function (data) {
                                    $scope.param.configService = data[0];
                                });
                        },
                        "configHost": function () {
                            surveilConfig.getHost(templateManager.getPageParam('host_name'))
                                .then(function (data) {
                                    $scope.param.configHost = data[0];
                                });
                        },
                        "configCommand": function () {
                            surveilConfig.getCommand(templateManager.getPageParam('command_name'))
                                .then(function (data) {
                                    $scope.param.configCommand = data[0];
                                });
                        },
                        "host": function () {
                            var hostname = templateManager.getPageParam('host_name');

                            surveilStatus.getHost(templateManager.getPageParam('host_name')).then(function (data) {
                                surveilStatus.getService(templateManager.getPageParam('host_name')).then(function (services) {
                                    $scope.param.host = data[0];
                                    $scope.param.host.services = [];
                                    angular.forEach(services, function (service) {
                                        if (service.service_description === 'cpu') {
                                            $scope.param.host.cpu = service;
                                        } else if (service.service_description === 'load') {
                                            $scope.param.host.load = service;
                                            $scope.param.host.load.iframeUrl = iframeUrl.getIFrameUrl("metric_load1", hostname, "load");
                                        } else {
                                            $scope.param.host.services.push(service);
                                        }
                                    });
                                });
                            });
                        },
                        "hostMetrics": function () {
                            var hostname = templateManager.getPageParam('host_name');

                            surveilStatus.getHostMetricNames(hostname).then(function (metrics) {
                                $scope.param.host.metrics = metrics;
                                angular.forEach(metrics, function (metric) {
                                    surveilStatus.getHostMetric(hostname, metric).then(function (data) {
                                        // TODO: waiting for ORBER BY DESC support in InfluxDB
                                    });
                                });
                            });
                        },
                        "service": function () {
                            var hostname = templateManager.getPageParam('host_name'),
                                serviceDescription = templateManager.getPageParam('service_description');

                            console.log('hostname ')
                            console.log(hostname)
                            surveilStatus.getService(hostname, serviceDescription).then(function (data) {
                                $scope.param.service = data[0];
                                surveilStatus.getServiceMetricNames(hostname, serviceDescription).then(function(metric_names) {
                                    $scope.param.service.iframeUrls = {};
                                    angular.forEach(metric_names, function (metricName) {
                                        $scope.param.service.iframeUrls[metricName] = iframeUrl.getIFrameUrl("metric_" + metricName, hostname, serviceDescription);
                                        surveilStatus.getServiceMetric(hostname, serviceDescription).then(function(data) {
                                            // TODO: waiting for ORBER BY DESC support in InfluxDB
                                        });
                                    });
                                });
                            });
                        }
                    };

                    $scope.components = $scope.options.components;
                }]
        };
    });
