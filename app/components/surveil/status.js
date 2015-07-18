/*global jQuery */

'use strict';

angular.module('bansho.surveil')
    .service('surveilStatus', ['$http', '$q', 'surveilQuery',
        function ($http, $q, surveilQuery) {
            var getObjects = function (fields, filters, apiName, queryFilter) {
                var query = {},
                    transformations;

                if (apiName === 'hosts') {
                    transformations = hostMiddleware;
                } else if (apiName === 'services' || apiName === 'events') {
                    transformations = apiMiddleware;
                } else {
                    throw new Error('getObjects : ' + apiName + ' API is not supported');
                }

                if (apiName === 'hosts') {
                    hostQueryTransform(fields, filters);
                }

                if (fields.length > 0) {
                    query.fields = fields;
                }

                query.filters = JSON.stringify(filters);

            };

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

            var getService = function (hostName, description) {
                var fields = [],
                    filters = {
                        'is': {
                            'host_name': [hostName],
                            'service_description': [description]
                        }
                    };

                return this.getObjects(fields, filters, 'services')
                    .error(function () {
                        throw new Error('getService : POST Request failed');
                    });
            };

            var getServicesByHost = function (hostName) {
                var fields = [],
                    filters = {
                        'is': {
                            'host_name': [hostName]
                        }
                    };

                return this.getObjects(fields, filters, 'services')
                    .error(function () {
                        throw new Error('getService : POST Request failed');
                    });
            };

            var getHostOpenProblems = function () {
                var fields = ['state'],
                    filters = {
                        'is': {
                            'state': ['DOWN', 'UNREACHABLE'],
                            'acknowledged': [false]
                        }
                    },
                    apiName = 'hosts';

                return getObjects(fields, filters, apiName)
                    .error(function () {
                        throw new Error('getHostOpenProblems : POST Request failed');
                    });
            };

            var getServiceOpenProblems = function () {
                var serviceFields = ['host_name', 'state'],
                    serviceFilters = {
                        'isnot': {
                            'state': ['OK']
                        },
                        'is': {
                            'acknowledged': [false]
                        }
                    },
                    hostFields = ['host_name', 'state'],
                    hostFilters = {'isnot': {'state': ['DOWN', 'UNREACHABLE']}},
                    responsePromise = $q.defer();

                getObjects(hostFields, hostFilters, 'hosts')
                    .success(function (hostData) {
                        var hostsResult = {},
                            i;

                        // Creates a host dictionnary for performance
                        for (i = 0; i < hostData.length; i += 1) {
                            hostsResult[hostData[i].host_name] = '';
                        }

                        getObjects(serviceFields, serviceFilters, 'services')
                            .success(function (serviceData) {
                                var result = [];
                                for (i = 0; i < serviceData.length; i += 1) {
                                    if (serviceData[i].host_name in hostsResult) {
                                        result.push(serviceData[i]);
                                    }
                                }
                                responsePromise.resolve(result);
                            });
                    });

                return responsePromise.promise;
            };

            var getHostProblems = function () {
                var fields = ['state'],
                    filters = {'isnot': {'state': ['UP']}},
                    apiName = 'hosts';

                return getObjects(fields, filters, apiName)
                    .error(function () {
                        throw new Error('getHostProblems : POST Request failed');
                    });
            };

            // This service is used to count the number of service problems
            var getServiceProblems = function () {
                var fields = ['state'],
                    filters = {'isnot': {'state': ['OK']}},
                    apiName = 'services';

                return getObjects(fields, filters, apiName)
                    .error(function () {
                        throw new Error('getServiceOpenProblems : POST Request failed');
                    });
            };

            // This service is used to count the number of hosts
            var getTotalHosts = function () {
                var fields = ['host_name'],
                    filters = {},
                    apiName = 'hosts';

                return getObjects(fields, filters, apiName)
                    .error(function () {
                        throw new Error('getTotalHosts : POST Request failed');
                    });
            };

            // This service is used to count the number of services
            var getTotalServices = function () {
                var fields = ['host_name'],
                    filters = {},
                    apiName = 'services';

                return getObjects(fields, filters, apiName)
                    .error(function () {
                        throw new Error('getTotalServices : POST Request failed');
                    });
            };

            var getHost = function (objectType, objectIdentifier) {
                var objectData = {},
                    endpoints = {
                        "host": "hosts",
                        "service": "services"
                    },
                    liveUrl = 'surveil/v2/status/' + endpoints[objectType] + '/' + objectIdentifier.host_name + '/',
                    configUrl = 'surveil/v2/config/' + endpoints[objectType] + '/' + objectIdentifier.host_name + '/',
                    responsePromise = $q.defer();

                $http.get(liveUrl).success(function (liveData) {
                    $http.get(configUrl).success(function (configData) {
                        objectData.live = liveData;
                        objectData.config = configData;
                        responsePromise.resolve(objectData);
                    });
                });

                return responsePromise.promise;
            };

            var getHostMetric = function (host, metric) {
                return getMetric(host, undefined, metric);
            };

            var getHostMetricNames = function (host, metric) {
                return getMetricNames(host, undefined);
            };

            var getServiceMetric = function (host, service, metric) {
                return getMetric(host, service, metric);
            };

            var getServiceMetricNames = function (host, service) {
                return getMetricNames(host, service);
            };

            var hostQueryTransform = function (fields, filters) {
                var i,
                    transformations = {
                        'host_state': 'state',
                    };

                for (i = 0; i < fields.length; i += 1) {
                    if (fields[i] in transformations) {
                        fields[i] = transformations[fields[i]];
                    }
                }
            };

            // Modify response object to conform to web ui
            var apiMiddleware = function (data) {
                var i = 0,
                    conversions = {};

                if (jQuery.isEmptyObject(conversions)) {
                    return data;
                }

                for (i = 0; i < data.length; i += 1) {
                    angular.forEach(data[i], function (value, field) {
                        if (field in conversions) {
                            data[i][conversions[field]] = value;
                            delete data[i][field];
                        }
                    });
                }

                return data;
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
                var promise = $q.defer(), query;

                console.log(endpoint)
                //if (endpoint !== 'hosts' || endpoint !== 'services' || endpoint !== 'events') {
                //    throw new Error('getData in surveilStatus : Invalid endpoint ' + endpoint);
                //}

                query = surveilQuery(fields, filters);

                executeQuery('surveil/v2/status/' + endpoint + '/', 'POST', query)
                    .success(function (data) {
                        console.log(data)
                        promise.resolve(data);
                    });

                return promise.promise;
            };

            var getTableData = function (fields, inputSourceConfig) {
                var hostFields = [],
                    serviceFields = [],
                    hostFilters = {},
                    serviceFilters = {},
                    hostKeys = {
                        'host_state': 'state',
                        'address': 'address',
                        //'childs': 'childs'
                    },
                    i,
                    found = false;

                if (inputSourceConfig.apiName === 'hosts') {
                    this.getObjects(fields, inputSourceConfig.filters, 'hosts')
                        .success(function (data) {
                            responsePromise.resolve(data);
                        });
                    return responsePromise.promise;
                } else if (inputSourceConfig.apiName === 'services') {
                    angular.forEach(fields, function (field) {
                        if (field in hostKeys) {
                            hostFields.push(hostKeys[field]);
                        } else {
                            serviceFields.push(field);
                        }
                    });

                    // Make sure that 'host_name' is in both queries as we
                    // use this field to merge data
                    if ($.inArray('host_name', hostFields) === -1) {
                        hostFields.push('host_name');
                    }
                    if ($.inArray('host_name', serviceFields) === -1) {
                        serviceFields.push('host_name');
                    }

                    angular.forEach(inputSourceConfig.filters, function (filterData, filterName) {
                        angular.forEach(filterData, function (values, field) {
                            if (field in hostKeys) {
                                if (!(filterData in hostFilters)) {
                                    hostFilters[filterName] = {};
                                }
                                hostFilters[filterName][hostKeys[field]] = values;
                            } else {
                                if (!(filterData in serviceFilters)) {
                                    serviceFilters[filterName] = {};
                                }
                                serviceFilters[filterName][field] = values;
                            }
                        });
                    });

                    // Queries host and service APIs and merges responses
                    getObjects(hostFields, hostFilters, 'hosts')
                        .success(function (hostData) {
                            getObjects(serviceFields, serviceFilters, 'services')
                                .success(function (serviceData) {
                                    var hostDict = {};

                                    // Create a host dict for performance
                                    for (i = 0; i < hostData.length; i += 1) {
                                        var host_name = hostData[i].host_name;

                                        angular.forEach(hostData[i], function (value, field) {
                                            if (!(host_name in hostDict)) {
                                                hostDict[host_name] = {};
                                            }

                                            hostDict[host_name][field] = value;
                                        });
                                    }

                                    for (i = 0; i < serviceData.length; i += 1) {
                                        angular.forEach(hostDict[serviceData[i].host_name],
                                            function (value, field) {
                                                serviceData[i][field] = value;
                                            });
                                    }

                                    responsePromise.resolve(serviceData);
                                });
                        });

                    return responsePromise.promise;
                } else if (inputSourceConfig.apiName === 'events') {

                }
            };

            return {
                getData: getData,
                getHost: getHost,
                getObjects : getObjects,
                getService : getService,
                hostQueryTransform: hostQueryTransform,
                getHostOpenProblems: getHostOpenProblems,
                getServiceProblems: getServiceProblems,
                getServiceOpenProblems: getServiceOpenProblems,
                getHostProblems: getHostProblems,
                //getTableData: getTableData,
                getTotalHosts: getTotalHosts,
                getTotalServices: getTotalServices,
                getServicesByHost: getServicesByHost,
                getHostMetric: getHostMetric,
                getHostMetricNames: getHostMetricNames,
                getServiceMetric: getServiceMetric,
                getServiceMetricNames: getServiceMetricNames
            };
        }]);
