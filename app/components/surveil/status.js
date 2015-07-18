/*global jQuery */

'use strict';

angular.module('bansho.surveil')
    .service('surveilStatus', ['$http', '$q', 'surveilQuery', 'componentsConfig',
        function ($http, $q, surveilQuery, componentsConfig) {
            var getMetric = function (host, service, metric) {
                var url = 'surveil/v2/status/hosts/' + host,
                    responsePromise = $q.defer();

                if (service !== undefined) {
                    url += '/services/' + service;
                }

                url += '/metrics/' + metric;

                $http.get(url).success(function (metric) {
                    responsePromise.resolve(metric);
                })
                .error(function () {
                    throw new Error('getMetric: GET Request failed');
                });

                return responsePromise.promise;
            };

            var getMetricNames = function (host, service) {
                var url = '/surveil/v2/status/hosts/' + host,
                    responsePromise = $q.defer();

                if (service !== undefined) {
                    url += '/services/' + service;
                }

                url += '/metrics/';

                $http.get(url).success(function (metrics) {
                    var result = [];
                    for (var i = 0; i < metrics.length; i += 1) {
                        if (metrics[i].metric_name.indexOf("metric_") === 0)  {
                            result.push(metrics[i]);
                        }
                    }

                    responsePromise.resolve(result);
                })
                .error(function () {
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

                if (!queryEndpoint[endpoint])  {
                    throw new Error('getData in surveilStatus : Invalid endpoint ' + endpoint);
                }

                queryEndpoint[endpoint](fields, filters, function (data) {
                    promise.resolve(data);
                });

                return promise.promise;
            };

            var queryEndpoint = {
                "services": function (fields, filters,  callback) {
                    var hostQuery = surveilQuery(fields, filters['hosts']),
                        response = [];

                    executeQuery('surveil/v2/status/hosts/', 'POST', hostQuery)
                        .success(function (hosts) {
                            angular.forEach(hosts, function (host) {
                                var serviceQuery, filter = filters['services'];

                                angular.forEach(host, function (value, attr) {
                                    host['host_' + attr] = host[attr];
                                    delete host[attr];
                                });

                                if (!filter.is) {
                                    filter.is = {}
                                }
                                filter.is.host_name = [host.host_host_name]

                                serviceQuery = surveilQuery(fields, filter);
                                executeQuery('surveil/v2/status/services/', 'POST', serviceQuery)
                                    .success(function (services) {
                                        angular.forEach(services, function (service) {
                                            var data = {}

                                            for (var attr in host) {
                                                data[attr] = host[attr];
                                            }

                                            for (var attr in service) {
                                                data['service_' + attr] = service[attr];
                                            }
                                            response.push(data);
                                        });
                                    });
                            });

                            callback(response);
                        });
                },
                "hosts": function (fields, filters, callback) {
                    var query = surveilQuery(fields, filters['hosts']);

                    executeQuery('surveil/v2/status/hosts/', 'POST', query)
                        .success(function (hosts) {
                            angular.forEach(hosts, function (host) {
                                angular.forEach(host, function (value, attr) {
                                    host['host_' + attr] = host[attr];
                                    delete host[attr];
                                });
                            });

                            callback(hosts)
                        });
                },
                "events": function (fields, filters, callback) {
                    var query = surveilQuery(fields, filters['events']);

                    executeQuery('surveil/v2/status/events/', 'POST', query)
                        .success(function (events) {
                            angular.forEach(events, function (event) {
                                angular.forEach(event, function (value, attr) {
                                    event['event_' + attr] = event[attr];
                                    delete event[attr];
                                });
                            });

                            callback(events)
                        });
                }
            };

            return {
                getData: getData,
                getHost: function (hostname) {
                    var promise = $q.defer(), query = { "hosts": { "is" : { "host_name": hostname } } };
                    getData([], query,  "services")
                        .then(function (data) {
                            promise.resolve(data);
                        });
                    return promise.promise;
                },
                getNbHosts: function () {
                    var promise = $q.defer();
                    getData([], { "hosts": {}}, "hosts")
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
                getService : function (hostname, serviceDescription) {
                    var promise = $q.defer(), query = { "hosts": { "is": { "host_name": hostname } }, "services": {} };

                    if (serviceDescription) {
                        query.services = { "is" : { "service_description" : serviceDescription } };
                    }

                    getData([], query,  "services")
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
                getHostMetric: function (host, metric) {
                    return getMetric(host, undefined, metric);
                },
                getHostMetricNames: function (host)  {
                    return getMetricNames(host, undefined);
                },
                getServiceMetric: function (host, service, metric) {
                    return getMetric(host, service, metric);
                },
                getServiceMetricNames:function (host, service) {
                    return getMetricNames(host, service);
                }
            };
        }]);
