/*global jQuery */

'use strict';

angular.module('bansho.surveil')
    .service('surveilStatus', ['$http', '$q', 'surveilQuery', 'componentsConfig', 'surveilApiConfig',
        function ($http, $q, surveilQuery, componentsConfig, surveilApiConfig) {
            var getMetric = function (host, service, metric) {
                var url = surveilApiConfig.endpoint('status') + '/hosts/' + host,
                    responsePromise = $q.defer();

                if (service !== undefined) {
                    url += '/services/' + service;
                }

                url += '/metrics/' + metric;

                $http.get(url).success(function (metric) {
                    responsePromise.resolve(metric);
                }).error(function () {
                    throw new Error('getMetric: GET Request failed');
                });

                return responsePromise.promise;
            };

            var getMetricNames = function (host, service) {
                var url = surveilApiConfig.endpoint('status') + '/hosts/' + host,
                    responsePromise = $q.defer();

                if (service !== undefined) {
                    url += '/services/' + service;
                }

                url += '/metrics/';

                $http.get(url).success(function (metrics) {
                    var result = [];
                    for (var i = 0; i < metrics.length; i += 1) {
                        result.push(metrics[i].metric_name);
                    }

                    responsePromise.resolve(result);
                }).error(function () {
                    throw new Error('getMetricNames: GET Request failed');
                });

                return responsePromise.promise;
            };

            var executeQuery = function (url, method, query) {
                return $http({
                    url: url,
                    method: method,
                    data: query
                }).error(function () {
                    throw new Error('executeQuery : ' + method + ' Request failed');
                });
            };

            var queryHostsServices = function (fields, filters, paging, callback) {
                var hostQuery = surveilQuery(fields, filters.hosts, paging),
                    serviceQuery = surveilQuery(fields, filters.services, paging);

                executeQuery(surveilApiConfig.endpoint('status') + '/hosts/', 'POST', hostQuery)
                    .success(function (hosts) {
                        executeQuery(surveilApiConfig.endpoint('status') + '/services/', 'POST', serviceQuery)
                            .success(function (services) {
                                callback(hosts, services);
                            });
                    });
            };

            var createHostsDict = function (hosts) {
                var hostsDict = {};
                if (!(hosts instanceof Array)) {
                    hosts = [hosts];
                }

                angular.forEach(hosts, function (host) {
                    var hostDict = {};
                    angular.forEach(host, function (value, attr) {
                        hostDict['host_' + attr] = value;
                    });

                    hostsDict[host.host_name] = hostDict;
                });

                return hostsDict;
            };

            var queryEndpoint = {
                "services": function (fields, filters, paging, callback) {
                    queryHostsServices(fields, filters, paging, function (hosts, services) {
                        var hostsDict = createHostsDict(hosts),
                            response = [];

                        angular.forEach(services, function (service) {
                            var serviceDict = {};
                            angular.forEach(service, function (value, attr) {
                                serviceDict['service_' + attr] = value;
                            });

                            if (hostsDict[serviceDict.service_host_name]) {
                                angular.extend(serviceDict, hostsDict[serviceDict.service_host_name]);
                                response.push(serviceDict);
                            }
                        });

                        callback(response);
                    });
                },
                "hosts": function (fields, filters, paging, callback) {
                    var hostQuery = surveilQuery(fields, filters.hosts, paging),
                        method = 'POST',
                        hostUrl = surveilApiConfig.endpoint('status') + '/hosts/';

                    executeQuery(hostUrl, method, hostQuery)
                        .success(function (hosts) {
                            var hostsDict = createHostsDict(hosts),
                                response = [];

                            angular.forEach(hostsDict, function (host) {
                                response.push(host);
                            });

                            callback(response);
                        });
                },
                "events": function (fields, filters, paging, callback) {
                    var query = surveilQuery(fields, filters.events, paging);

                    executeQuery(surveilApiConfig.endpoint('status') + '/events/', 'POST', query)
                        .success(function (events) {
                            angular.forEach(events, function (event) {
                                angular.forEach(event, function (value, attr) {
                                    event['event_' + attr] = event[attr];
                                    delete event[attr];
                                });
                            });

                            callback(events);
                        });
                }
            };

            var validEndpoint = {
                "events": "event_name",
                "hosts": "host_name",
                "services": "service_description",
            };

            var specialTreatment = {
                statusHostMetrics: function (data) {
                },
                statusService: function (data) {
                    var hostname = templateManager.getPageParam('host_name'),
                        serviceDescription = templateManager.getPageParam('service_description');

                    surveilStatus.getService(hostname, serviceDescription).then(function (data) {
                        $scope.param.service = data[0];
                        surveilStatus.getServiceMetricNames(hostname, serviceDescription).then(function(metric_names) {
                            $scope.param.service.iframeUrls = {};
                            angular.forEach(metric_names, function (metricName) {
                                $scope.param.service.iframeUrls[metricName] = iframeUrl.getIFrameUrl("metric_" + metricName, hostname, serviceDescription);
                                surveilStatus.getServiceMetric(hostname, serviceDescription).then(function(data) {
                                    //TODO: waiting for ORBER BY DESC support in InfluxDB
                                });
                            });
                        });
                    });
                }
            };

            return {
                getDataFromInputSource: function (fields, inputSource, keys, operations, paging) {
                    // Todo merge filter function
                    var promise = $q.defer(),
                        filter = componentsConfig.getFilter(inputSource.filter).filter,
                        endpoint = inputSource.endpoint;

                    if (endpoint === "services" &&
                        keys && keys.host_name) {
                        filter = {
                            "hosts": {"is": {"host_name": [keys.host_name]}},
                            "services": {"is": {"host_name": [keys.host_name]}}
                        };

                        if (keys.service_description) {
                            filter.services["is"]["service_description"] = [keys.service_description];
                        }
                    } else if (keys && keys[validEndpoint[endpoint]]) {
                        var key = validEndpoint[endpoint],
                            value = keys[key];

                        filter = {};
                        filter[endpoint] = {"is": {}};
                        filter[endpoint]["is"][key] = [value];
                        console.log(filter)
                    }

                    if (!queryEndpoint[endpoint]) {
                        throw new Error('getData in surveilStatus : Invalid endpoint ' + endpoint);
                    }

                    queryEndpoint[endpoint](fields, filter, paging, function (data) {
                        if (operations && operations.count) {
                            promise.resolve(data.length);
                        } else {
                            if (specialTreatment[endpoint]) {
                                data = specialTreatment[endpoint](data);
                            }
                            promise.resolve(data);
                        }
                    });

                    return promise.promise;
                },
                getHostMetric: function (host, metric) {
                    return getMetric(host, undefined, metric);
                },
                getHostMetricNames: function (host) {
                    return getMetricNames(host, undefined);
                },
                getServiceMetric: function (host, service, metric) {
                    return getMetric(host, service, metric);
                },
                getServiceMetricNames: function (host, service) {
                    return getMetricNames(host, service);
                }
            };
        }]);
