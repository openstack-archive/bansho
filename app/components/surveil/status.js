/*global jQuery */

'use strict';

angular.module('bansho.surveil')
    .constant('statusApiConfig', (function() {
        var defaultApiConfig = {
            webuiToApiMapping: {}
        }

        return {
            endpoints: {
                hosts: {
                    webuiToApiMapping: { 'host_state': 'state' }
                },
                events: defaultApiConfig,
                services: defaultApiConfig
            }
        }
    })())

    .service('surveilStatus', ['$http', '$q', 'statusApiConfig',
        function ($http, $q, statusApiConfig) {
            // host middleware
            var getApiFields = function (data, webuiToApiMapping) {
                var i = 0;

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

            // hostquery transform
            var getWebuiFields = function (data, webuiToApiMapping) {
                var i,
                    apiToWebuiMapping = {};

                angular.forEach(webuiToApiMapping, function(api, webui) {
                    apiToWebuiMapping[api] = webui;
                });

                for (i = 0; i < data.length; i += 1) {
                    console.log(data[i])
                    if (data[i] in apiToWebuiMapping) {
                        console(apiToWebMapping[data[i]])
                        data[i] = apiToWebMapping[data[i]];
                    }
                }
            };

            var appendTransform = function (defaults, transform) {
                // We can't guarantee that the default transformation is an array
                defaults = angular.isArray(defaults) ? defaults : [defaults];

                return defaults.concat(transform);
            };

            var getObjects = function (webuiData, filters, apiName) {
                var query = {},
                    apiFields,
                    transformations;

                if (!statusApiConfig.endpoints[apiName]) {
                    throw new Error('getObjects : ' + apiName + ' API is not supported');
                }

                // Create fields to query.
                if (webuiData.length > 0) {
                    query.fields = getApiFields(webuiData, statusApiConfig.endpoints[apiName].mappingWebuiApi);
                }
                transformations = getApiFields(webuiData, statusApiConfig.endpoints[apiName].mappingWebuiApi);

                query.filters = JSON.stringify(filters);

                return $http({
                    url: 'surveil/v2/status/' + apiName + '/',
                    method: 'POST',
                    data: query,
                    transformResponse: appendTransform($http.defaults.transformResponse, transformations)
                }).error(function () {
                    throw new Error('getObjects : POST Request failed');
                });
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
                        if (metrics[i].metric_name.indexOf("metric_") === 0) {
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

            // Modify response object to conform to web ui
            var getTableData = function (fields, inputSourceConfig) {
                var hostFields = [],
                    serviceFields = [],
                    hostFilters = {},
                    serviceFilters = {},
                    hostKeys = {
                        'host_state': 'state',
                        'address': 'address',
                        'childs': 'childs'
                    },
                    responsePromise = $q.defer(),
                    i,
                    found = false;

                if (inputSourceConfig.apiName === 'hosts' ||
                        inputSourceConfig.apiName === 'events') {
                    var queryFields = [];

                    // Queries events API
                    if (inputSourceConfig.fields)
                        queryFields = inputSourceConfig.fields;

                    getObjects(queryFields, inputSourceConfig.filters, inputSourceConfig.apiName)
                        .success(function (data) {
                            console.log(data)
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
                    this.getObjects(hostFields, hostFilters, 'hosts')
                        .success(function (hostData) {
                            getObjects(serviceFields, serviceFilters, 'services')
                                .success(function (serviceData) {
                                    var hostDict = {};

                                    console.log(hostData)
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
                }
            };

            return {
                getHost: getHost,
                getObjects : getObjects,
                getService : getService,
                getHostOpenProblems: getHostOpenProblems,
                getServiceProblems: getServiceProblems,
                getServiceOpenProblems: getServiceOpenProblems,
                getHostProblems: getHostProblems,
                getTableData: getTableData,
                getTotalHosts: getTotalHosts,
                getTotalServices: getTotalServices,
                getServicesByHost: getServicesByHost,
                getHostMetric: getHostMetric,
                getHostMetricNames: getHostMetricNames,
                getServiceMetric: getServiceMetric,
                getServiceMetricNames: getServiceMetricNames
            };
        }]);
