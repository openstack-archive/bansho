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

            var getData = function (fields, filters, endpoint) {
                var promise = $q.defer();

                if (!queryEndpoint[endpoint]) {
                    throw new Error('getData in surveilStatus : Invalid endpoint ' + endpoint);
                }

                queryEndpoint[endpoint](fields, filters, function (data) {
                    promise.resolve(data);
                });

                return promise.promise;
            };

            var queryHostsServices = function (fields, filters, callback) {
                var hostQuery = surveilQuery(fields, filters.hosts),
                    serviceQuery = surveilQuery(fields, filters.services);

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
                "services": function (fields, filters, callback) {
                    queryHostsServices(fields, filters, function (hosts, services) {
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
                "hosts": function (fields, filters, callback) {
                    var hostQuery = surveilQuery(fields, filters.hosts),
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
                "events": function (fields, filters, callback) {
                    var query = surveilQuery(fields, filters.events);

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

            return {
                getData: getData,
                getHost: function (hostname) {
                    var promise = $q.defer(), query = {"hosts": {"is": {"host_name": [ hostname ] } } };
                    getData([], query, "hosts")
                        .then(function (data) {
                            promise.resolve(data);
                        });
                    return promise.promise;
                },
                getNbHosts: function () {
                    var promise = $q.defer();
                    getData([], componentsConfig.getFilter("all").filter, "hosts")
                        .then(function (data) {
                            promise.resolve(data.length);
                        });
                    return promise.promise;
                },
                getNbHostOpenProblems: function () {
                    var promise = $q.defer();
                    getData([], componentsConfig.getFilter("allHostOpenProblems").filter, "hosts")
                        .then(function (data) {
                            promise.resolve(data.length);
                        });
                    return promise.promise;
                },
                getNbHostsProblems: function () {
                    var promise = $q.defer();
                    getData([], componentsConfig.getFilter("allHostsProblems").filter, "hosts")
                        .then(function (data) {
                            promise.resolve(data.length);
                        });
                    return promise.promise;
                },
                getService: function (hostname, serviceDescription) {
                    var promise = $q.defer(), query = { "hosts": { "is": { "host_name": [hostname] } }, "services": {"is": {"host_name": [hostname] } } };

                    if (serviceDescription) {
                        query.services = { "is": { "service_description": [ serviceDescription ] } };
                    }

                    getData([], query, "services")
                        .then(function (data) {
                            promise.resolve(data);
                        });
                    return promise.promise;
                },
                getNbServices: function () {
                    var promise = $q.defer();
                    getData([], componentsConfig.getFilter("allServices").filter, "services")
                        .then(function (data) {
                            promise.resolve(data.length);
                        });
                    return promise.promise;
                },
                getNbServiceOpenProblems: function () {
                    var promise = $q.defer();
                    getData([], componentsConfig.getFilter("allServiceOpenProblems").filter, "services")
                        .then(function (data) {
                            promise.resolve(data.length);
                        });
                    return promise.promise;
                },
                getNbServiceOpenProblemsOnly: function () {
                    var promise = $q.defer();
                    getData([], componentsConfig.getFilter("allServiceOpenProblemsOnly").filter, "services")
                        .then(function (data) {
                            promise.resolve(data.length);
                        });
                    return promise.promise;
                },
                getNbServicesProblems: function () {
                    var promise = $q.defer();
                    getData([], componentsConfig.getFilter("allServicesProblems").filter, "services")
                        .then(function (data) {
                            promise.resolve(data.length);
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
