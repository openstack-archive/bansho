'use strict';

angular.module('bansho.live', [])

    .service('getObjects', ['$http', 'hostQueryTransform', 'hostMiddleware', 'serviceMiddleware',
        function ($http, hostQueryTransform, hostMiddleware, serviceMiddleware) {
            return function (fields, filters, apiName, additionnalFields) {
                var query = {},
                    transformations;
                
                // Merges additionnalFields into filters as 'is' filter
                angular.forEach(additionnalFields, function (value, key) {
                    if (!('is' in filters)) {
                        filters.is = {};
                    }

                    if (!(key in filters.is)) {
                        filters.is[key] = [];
                    }

                    filters.is[key].push(value);
                })

                function appendTransform(defaults, transform) {
                    // We can't guarantee that the default transformation is an array
                    defaults = angular.isArray(defaults) ? defaults : [defaults];

                    return defaults.concat(transform);
                };

                if (apiName === 'hosts') {
                    transformations = hostMiddleware;
                } else if (apiName === 'services') {
                    transformations = serviceMiddleware;
                } else {
                    throw new Error('getObjects : ' + apiName + ' API is not supported');
                }

                if (apiName === 'hosts') {
                    hostQueryTransform(fields, filters);
                }

                if (fields.length > 0) {
                    query.fields = JSON.stringify(fields);
                }

                query.filters = JSON.stringify(filters);

                return $http({
                    url: '/surveil/v2/status/' + apiName + '/',
                    method: 'POST',
                    data: query,
                    transformResponse: appendTransform($http.defaults.transformResponse, transformations),
                }).error(function () {
                    throw new Error('getObjects : POST Request failed');
                });
            };
        }])

    .service('getService', ['$http', 'getObjects',
        function ($http, getObjects) {
            return function (hostName, description) {
                var fields = [],
                    filters = {},
                    additionnalFields = { 'host_name': hostName, 'description': description };

                return getObjects(fields, filters, 'services', additionnalFields)
                    .error(function () {
                        throw new Error('getService : POST Request failed');
                    });
            };
        }])

    // This service is used to count the number of host open problems
    .service('getHostOpenProblems', ['$http', 'getObjects',
        function ($http, getObjects) {
            return function () {
                var fields = ['state'],
                    filters = {},
                    apiName = 'hosts',
                    additionnalFields = {'acknowledged': 0, 'state': 1};

                return getObjects(fields, filters, apiName, additionnalFields)
                    .error(function () {
                        throw new Error('getHostOpenProblems : POST Request failed');
                    });
            };
        }])

    // This service is used to count the number of service open problems
    .service('getServiceOpenProblems', ['$http', '$q', 'getObjects',
        function ($http, $q, getObjects) {
            return function () {
                var serviceFields = ['host_name', 'state'],
                    serviceFilters = { 'isnot': { 'state': [0] } },
                    serviceAdditionnalFields = { 'acknowledged': 0 },
                    hostFields = ['host_name', 'state'],
                    hostFilters = { 'isnot': { 'state': [2] } },
                    hostAdditionnalFields = {},
                    responsePromise = $q.defer();

                getObjects(hostFields, hostFilters, 'hosts', hostAdditionnalFields)
                    .success(function (hostData) {
                        var hostsResult = {},
                            i;

                        // Creates a host dictionnary for performance
                        for (i = 0; i < hostData.length; i += 1) {
                            hostsResult[hostData[i].host_name] = '';
                        }

                        getObjects(serviceFields, serviceFilters, 'services', serviceAdditionnalFields)
                            .success(function (serviceData) {
                                var result = [];
                                for (i = 0; i < serviceData.length; i += 1) {
                                    if (serviceData[i].host_name in hostsResult) {
                                        result.push(serviceData[i]);
                                    }
                                }
                                responsePromise.resolve(result);
                            });
                    });

                return responsePromise.promise;
            };
        }])

    // This service is used to count the number of host problems
    .service('getHostProblems', ['$http', 'getObjects',
        function ($http, getObjects) {
            return function () {
                var fields = ['state'],
                    filters = { 'isnot': {'state': [0]} },
                    apiName = 'hosts',
                    additionnalFields = {};

                return getObjects(fields, filters, apiName, additionnalFields)
                    .error(function () {
                        throw new Error('getHostProblems : POST Request failed');
                    });
            };
        }])

    // This service is used to count the number of service problems
    .service('getServiceProblems', ['$http', 'getObjects',
        function ($http, getObjects) {
            return function () {
                var fields = ['state'],
                    filters = { 'isnot': {'state': [0]} },
                    apiName = 'services',
                    additionnalFields = {};

                return getObjects(fields, filters, apiName, additionnalFields)
                    .error(function () {
                        throw new Error('getServiceOpenProblems : POST Request failed');
                    });
            };
        }])

    // This service is used to count the number of hosts
    .service('getTotalHosts', ['$http', 'getObjects',
        function ($http, getObjects) {
            return function () {
                var fields = ['host_name'],
                    filters = {},
                    apiName = 'hosts',
                    additionnalFields = {};

                return getObjects(fields, filters, apiName, additionnalFields)
                    .error(function () {
                        throw new Error('getTotalHosts : POST Request failed');
                    });
            };
        }])

    // This service is used to count the number of services
    .service('getTotalServices', ['$http', 'getObjects',
        function ($http, getObjects) {
            return function () {
                var fields = ['host_name'],
                    filters = {},
                    apiName = 'services',
                    additionnalFields = {};

                return getObjects(fields, filters, apiName, additionnalFields)
                    .error(function () {
                        throw new Error('getTotalServices : POST Request failed');
                    });
            };
        }])

    .service('getHost', ['$http', '$q', function ($http, $q) {
        return function (objectType, objectIdentifier) {
            var objectData = {},
                endpoints = {
                    "host" : "hosts",
                    "service" : "services"
                },
                liveUrl = '/surveil/v2/status/' + endpoints[objectType] + '/' + objectIdentifier.host_name + '/',
                configUrl = '/surveil/v2/config/'+ endpoints[objectType] + '/' + objectIdentifier.host_name + '/',
                responsePromise = $q.defer();

            $http.get(liveUrl) .success(function (liveData) {
                $http.get(configUrl).success(function (configData) {
                    objectData.live = liveData;
                    objectData.config = configData;
                    responsePromise.resolve(objectData);
                })
            });

            return responsePromise.promise;
        };
    }])

    .service('hostQueryTransform', function () {
        return function (fields, filters) {
            var i,
                transformations = {
                    'host_state': 'state',
                };

            for (i = 0; i < fields.length; i += 1) {
                if (fields[i] in transformations) {
                    fields[i] = transformations[fields[i]];
                }
            }
        }
    })

    // Modify response object to conform to web ui
    .service('hostMiddleware', function() {
        return function (data) {
            var i = 0,
                conversions = {
                    'state': 'host_state'
                };

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
    })

    // Modify response object to conform to web ui
    .service('serviceMiddleware', function() {
        return function (data) {
            var i = 0,
                conversions = {
                };

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
    })

    .service('getTableData', ['$q', 'getObjects',
        function ($q, getObjects) {
            return function (fields, filters, apiName, additionnalFields) {
                var hostFields = [],
                    serviceFields = [],
                    hostFilters = {},
                    serviceFilters = {},
                    hostAdditionnalFields = {},
                    serviceAdditionnalFields = {},
                    hostKeys = {
                        'host_state': 'state',
                        'address': 'address',
                        'childs': 'childs'
                    },
                    responsePromise = $q.defer(),
                    i,
                    found = false;

                if (apiName === 'hosts') {
                    getObjects(fields, filters, 'hosts', additionnalFields)
                        .success(function (data) {
                            responsePromise.resolve(data);
                        });
                    return responsePromise.promise;
                }
                
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

                angular.forEach(additionnalFields, function (value, field) {
                    if (field in hostKeys) {
                        hostAdditionnalFields[hostKeys[field]] = value;
                    } else {
                        serviceAdditionnalFields[field] = value;
                    }
                })

                angular.forEach(filters, function (filterData, filterName) {
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
                getObjects(hostFields, hostFilters, 'hosts', hostAdditionnalFields)
                    .success(function (hostData) {
                        getObjects(serviceFields, serviceFilters, 'services', serviceAdditionnalFields)
                            .success(function (serviceData) {
                                var hostDict = {};

                                // Create a host dict for performance
                                for (i = 0; i < hostData.length; i += 1) {
                                    var host_name = hostData[i].host_name;

                                    angular.forEach(hostData[i], function (value, field) {
                                        if (!(host_name in hostDict)) {
                                            hostDict[host_name] = {};
                                        }

                                        hostDict[host_name][field]  = value;
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
            };
        }])
