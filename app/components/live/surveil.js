'use strict';

angular.module('adagios.live')

    .service('getObjects', ['$http', 'hostQueryTransform',
        function ($http, hostQueryTransform) {
            return function (fields, filters, apiName, additionnalFields) {
                var query = {};
                
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


                function transformations(data) {
                    // TODO: implement transformation
                    return data;
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

                return getObjects(fields, filters, additionnalFields)
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

    .service('getObjectId', ['$http', function ($http) {
        return function (objectType, objectIdentifier) {

            var postString, req;

            postString = "with_fields=id&object_type=" + objectType;
            angular.forEach(objectIdentifier, function (value, key) {
                if (key === "description") {
                    key = "service_description";
                }
                postString += "&" + key + "=" + value;
            });

            req = {
                method: 'POST',
                url: '/rest/pynag/json/get_objects',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: postString
            };

            return $http(req)
                .error(function () {
                    throw new Error('getObjectId : POST Request failed');
                });
        };
    }])

    .service('getObjectById', ['$http', function ($http) {
        return function (objectId) {

            var postString, req;

            postString = "with_fields=&id=" + objectId;

            req = {
                method: 'POST',
                url: '/rest/pynag/json/get_object',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: postString
            };


            return $http(req)
                .error(function () {
                    throw new Error('getHostById : POST Request failed');
                });
        };
    }])

    // Add object of specified type to $scope.data
    .service('addObjectToScope', ['$http', 'getObjectId', 'getObjectById', function ($http, getObjectId, getObjectById) {
        return function (objectType, objectIdentifier, scope) {
            var objectData = {},
                url = "/rest/status/json/",
                firstParameter = true,
                endpoints = {
                    "host" : "hosts",
                    "service" : "services"
                };

            url += endpoints[objectType];
            url += "/?";

            angular.forEach(objectIdentifier, function (value, key) {
                if (!firstParameter) {
                    url += "&";
                }
                url += key + "=" + value;
                firstParameter = false;

            });

            $http.get(url)
                .success(function (data) {
                    objectData.live = data[0];
                    getObjectId(objectType, objectIdentifier)
                        .success(function (data) {
                            var objectId = data[0].id;
                            scope.data.id = objectId;
                            getObjectById(objectId)
                                .success(function (data) {
                                    objectData.config = data;
                                    scope.data = objectData;
                                });
                        });
                });
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
        return function(data) {
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
                
                for (i = 0; i < fields.length; i += 1) {
                    if (fields[i] in hostKeys) {
                        hostFields.push(hostKeys[fields[i]]);
                    } else {
                        serviceFields.push(fields[i]);
                    }
                }

                // Make sure that 'host_name' is in both queries as we
                // use this field to merge data
                for (i = 0; i < hostFields.length; i += 1) {
                    if (hostFields[i] === 'host_name') {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    hostFields.push('host_name');
                }

                found = false;
                for (i = 0; i < serviceFields.length; i += 1) {
                    if (serviceFields[i] === 'host_name') {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    serviceFields.push('host_name');
                }

                angular.forEach(additionnalFields, function (value, field) {
                    if (field in hostKeys) {
                        hostAdditionnalFields[hostKeys[field]] = value;
                    } else {
                        serviceAdditionnalFields[field] = value;
                    }
                })

                //{ 'isnot': {'state': [0]} },
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

                // Query host and service APIs and merges responses
                getObjects(hostFields, hostFilters, 'hosts', hostAdditionnalFields)
                    .success(function (hostData) {
                        getObjects(serviceFields, serviceFilters, 'services', serviceAdditionnalFields)
                            .success(function (serviceData) {
                                var hostDict = {};

                                // Create a host dict for performance
                                for (i = 0; i < hostData.length; i += 1) {
                                    var host_name = hostData[i].host_name;

                                    angular.forEach(hostData[i], function (value, field) {
                                        var field_ = undefined,
                                            skip = false;

                                        if (field === 'host_name') {
                                            skip = true;
                                        }

                                        if (!skip) {
                                            angular.forEach(hostKeys, function (value, key) {
                                                if (value === field) {
                                                    field_ = key;
                                                }
                                            });

                                            if (field === undefined) {
                                                field_ = field;
                                            }

                                            if (!(host_name in hostDict)) {
                                                hostDict[host_name] = {};
                                            }

                                            hostDict[host_name][field_]  = value;
                                        }
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
