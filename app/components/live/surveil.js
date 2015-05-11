'use strict';

angular.module('bansho.live', [])
    .service('backendClient', ['$http', '$q',
        function ($http, $q) {
            var getObjects = function (fields, filters, apiName, additionnalFields) {
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
                });

                function appendTransform(defaults, transform) {
                    // We can't guarantee that the default transformation is an array
                    defaults = angular.isArray(defaults) ? defaults : [defaults];

                    return defaults.concat(transform);
                }

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
                    query.fields = fields;
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


            var getService = function (hostName, description) {
                var fields = [],
                    filters = {},
                    additionnalFields = {'host_name': hostName, 'description': description};

                return this.getObjects(fields, filters, 'services', additionnalFields)
                    .error(function () {
                        throw new Error('getService : POST Request failed');
                    });
            };

            var getHostOpenProblems = function () {
                var fields = ['state'],
                    filters = {'is': {'state': ['DOWN', 'UNREACHABLE']}},
                    apiName = 'hosts',
                    additionnalFields = {'acknowledged': false};

                return getObjects(fields, filters, apiName, additionnalFields)
                    .error(function () {
                        throw new Error('getHostOpenProblems : POST Request failed');
                    });
            };

            var getServiceOpenProblems = function () {
                var serviceFields = ['host_name', 'state'],
                    serviceFilters = {'isnot': {'state': ['OK']}},
                    serviceAdditionnalFields = {'acknowledged': false},
                    hostFields = ['host_name', 'state'],
                    hostFilters = {'isnot': {'state': ['CRITICAL']}},
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
                    apiName = 'hosts',
                    additionnalFields = {};

                return getObjects(fields, filters, apiName, additionnalFields)
                    .error(function () {
                        throw new Error('getHostProblems : POST Request failed');
                    });
            };

            // This service is used to count the number of service problems
            var getServiceProblems = function () {
                var fields = ['state'],
                    filters = {'isnot': {'state': ['OK']}},
                    apiName = 'services',
                    additionnalFields = {};

                return getObjects(fields, filters, apiName, additionnalFields)
                    .error(function () {
                        throw new Error('getServiceOpenProblems : POST Request failed');
                    });
            };

            // This service is used to count the number of hosts
            var getTotalHosts = function () {
                var fields = ['host_name'],
                    filters = {},
                    apiName = 'hosts',
                    additionnalFields = {};

                return getObjects(fields, filters, apiName, additionnalFields)
                    .error(function () {
                        throw new Error('getTotalHosts : POST Request failed');
                    });
            };

            // This service is used to count the number of services
            var getTotalServices = function () {
                var fields = ['host_name'],
                    filters = {},
                    apiName = 'services',
                    additionnalFields = {};

                return getObjects(fields, filters, apiName, additionnalFields)
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
                    liveUrl = '/surveil/v2/status/' + endpoints[objectType] + '/' + objectIdentifier.host_name + '/',
                    configUrl = '/surveil/v2/config/' + endpoints[objectType] + '/' + objectIdentifier.host_name + '/',
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
            var hostMiddleware = function (data) {
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

            // Modify response object to conform to web ui
            var serviceMiddleware = function (data) {
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

            var getTableData = function (fields, filters, apiName, additionnalFields) {
                console.log(filters)
                console.log(additionnalFields)
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
                    this.getObjects(fields, filters, 'hosts', additionnalFields)
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
                });

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
            };

            var acknowledge = function (host_name, service_description, attrs) {
				var data = {};

                data.host_name = host_name;
				if (attrs.sticky) {
					data.sticky = parseInt(attrs.sticky, 10);
				}

				if (attrs.notify) {
					data.notify = parseInt(attrs.notify, 10);
				}

				if (attrs.persistent) {
					data.persistent = parseInt(attrs.persistent, 10);
				}

                if (service_description !== undefined) {
                    data.service_description = service_description;
                }

                return $http({
                    url: '/surveil/v2/actions/acknowledge/',
                    method: 'POST',
                    data: data
                }).error(function () {
                    throw new Error('acknowledge : POST Request failed');
                });
            };

            var downtime = function (host_name, service_description, attrs) {
				attrs.host_name = host_name;
                if (service_description !== undefined) {
                    attrs.service_description = service_description;
                }

				return $http({
					url: '/surveil/v2/actions/downtime/',
					method: 'POST',
					data: attrs
				});
            };

            return {
                getHost: getHost,
                getObjects : getObjects,
                getService : getService,
                hostQueryTransform: hostQueryTransform,
                acknowledge: acknowledge,
                getHostOpenProblems: getHostOpenProblems,
                hostMiddleware: hostMiddleware,
                getServiceProblems: getServiceProblems,
                getServiceOpenProblems: getServiceOpenProblems,
                getHostProblems: getHostProblems,
                getTableData: getTableData,
                getTotalHosts: getTotalHosts,
                getTotalServices: getTotalServices,
                downtime: downtime
            };
        }]);
