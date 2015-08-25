/*global jQuery */

'use strict';

angular.module('bansho.surveil')
    .service('surveilConfig', ['$http', '$q','surveilQuery', 'componentsConfig', 'surveilApiConfig',
        function ($http, $q, surveilQuery, componentsConfig, surveilApiConfig) {
            var executeQuery = function (url, method, query) {
                return $http({
                    url: url,
                    method: method,
                    data: query
                }).error(function () {
                    throw new Error('executeQuery : ' + method + ' Request failed');
                });
            };

            var getData = function (fields, filters, endpoint, paging) {
                var promise = $q.defer();

                if (!validEndpoint[endpoint]) {
                    throw new Error('getData in surveilConfig : Invalid endpoint ' + endpoint);
                }

                queryEndpoint(endpoint, fields, filters, paging, function (data) {
                    promise.resolve(data);
                });

                return promise.promise;
            };

            // All the valid endpoint with their
            var validEndpoint = {
                "businessimpactmodulations": "business_impact_modulation_name",
                "checkmodulations": "checkmodulation_name",
                "commands": "command_name",
                "contacts": "contact_name",
                "contactgroups": "contact_group_name",
                "hosts": "host_name",
                "hostgroups": "hostgroup_name",
                "macromodulations": "macromodulations_name",
                "notificationways": "notificationway_name",
                "realms": "realm_name",
                "services": "service_description",
                "servicegroups": "servicegroup_name",
                "timeperiods": "timeperiods_name"
            };

            var queryEndpoint = function (endpoint, fields, filters, paging, callback) {
                var query = surveilQuery(fields, filters[endpoint], paging),
                    method = 'POST',
                    url = surveilApiConfig.endpoint('config') + '/' + endpoint + '/';

                executeQuery(url, method, query)
                    .success(function (data) {
                        var response = [];

                        angular.forEach(data, function (obj) {
                            response.push(obj);
                        });

                        callback(response);
                    });
            };

            return {
                getData: getData,
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
                    }

                    //if (!queryEndpoint[endpoint]) {
                    //    throw new Error('getData in surveilStatus : Invalid endpoint ' + endpoint);
                    //}

                    queryEndpoint(endpoint, fields, filter, paging, function (data) {
                        if (operations && operations.count) {
                            promise.resolve(data.length);
                        } else {
                            //if (specialTreatment[endpoint]) {
                            //    data = specialTreatment[endpoint](data);
                            //}
                            promise.resolve(data);
                        }
                    });

                    return promise.promise;
                //},
                    //if (endpoint === 'service') {
                    //    var promise = $q.defer(), query = { "hosts": { "is": { "host_name": [endpointValues.host_name] } }, "services": {"is": {"host_name": [endpointValues.host_name] } } };
                    //
                    //    if (endpointValues.service_description) {
                    //        query.services = { "is": { "service_description": [ endpointValues.service_description ] } };
                    //    }
                    //
                    //    getData([], query, "services")
                    //        .then(function (data) {
                    //            promise.resolve(data);
                    //        });
                    //    return promise.promise;
                    //
                    //} else {
                    //    var endpointKey = validEndpoint[endpoint],
                    //        singleValue = endpointValues[endpointKey]
                    //        promise = $q.defer(), query = {endpoint: {"is": {endpointKey: [ singleValue ] } } };
                    //    getData([], query, endpoint)
                    //        .then(function (data) {
                    //            promise.resolve(data);
                    //        });
                    //    return promise.promise;
                    //}
                },
                getBusinessImpactModulation: function (businessimpactmodulationName) {
                    var promise = $q.defer(), query = {"businessimpactmodulations": {"is": {"business_impact_modulation_name": [ businessimpactmodulationName ] } } };
                    getData([], query, "businessimpactmodulations")
                        .then(function (data) {
                            promise.resolve(data);
                        });
                    return promise.promise;
                },
                getCheckModulation: function (checkmodulationName) {
                    var promise = $q.defer(), query = {"checkmodulations": {"is": {"checkmodulation_name": [ checkmodulationName ] } } };
                    getData([], query, "checkmodulations")
                        .then(function (data) {
                            promise.resolve(data);
                        });
                    return promise.promise;
                },
                getCommand: function (commandName) {
                    var promise = $q.defer(), query = {"commands": {"is": {"command_name": [ commandName ] } } };
                    getData([], query, "commands")
                        .then(function (data) {
                            promise.resolve(data);
                        });
                    return promise.promise;
                },
                getContactGroup: function (contactgroupName) {
                    var promise = $q.defer(), query = {"contactgroups": {"is": {"contactgroup_name": [ contactgroupName ] } } };
                    getData([], query, "contactgroups")
                        .then(function (data) {
                            promise.resolve(data);
                        });
                    return promise.promise;
                },
                getContact: function (contactName) {
                    var promise = $q.defer(), query = {"contacts": {"is": {"contact_name": [ contactName ] } } };
                    getData([], query, "contacts")
                        .then(function (data) {
                            promise.resolve(data);
                        });
                    return promise.promise;
                },
                getHost: function (hostName) {
                    var promise = $q.defer(), query = {"hosts": {"is": {"host_name": [ hostName ] } } };
                    getData([], query, "hosts")
                        .then(function (data) {
                            promise.resolve(data);
                        });
                    return promise.promise;
                },
                getHostGroup: function (hostgroupName) {
                    var promise = $q.defer(), query = {"hostgroups": {"is": {"hostgroup_name": [ hostgroupName ] } } };
                    getData([], query, "hostgroups")
                        .then(function (data) {
                            promise.resolve(data);
                        });
                    return promise.promise;
                },
                getMacroModulationName: function (macromodulationName) {
                    var promise = $q.defer(), query = {"macromodulations": {"is": {"macromodulation_name": [ macromodulationName ] } } };
                    getData([], query, "macromodulations")
                        .then(function (data) {
                            promise.resolve(data);
                        });
                    return promise.promise;
                },
                getNotificationWay: function (notificationwayName) {
                    var promise = $q.defer(), query = {"notificationways": {"is": {"notificationway_name": [notificationwayName] } } };
                    getData([], query, "notificationways")
                        .then(function (data) {
                            promise.resolve(data);
                        });
                    return promise.promise;
                },
                getRealm: function (realmName) {
                    var promise = $q.defer(), query = {"realms": {"is": {"realm_name": [realmName] } } };
                    getData([], query, "realms")
                        .then(function (data) {
                            promise.resolve(data);
                        });
                    return promise.promise;
                },
                getServiceGroup: function (servicegroupName) {
                    var promise = $q.defer(), query = {"servicegroups": {"is": {"servicegroup_name": [servicegroupName] } } };
                    getData([], query, "servicegroups")
                        .then(function (data) {
                            promise.resolve(data);
                        });
                    return promise.promise;
                },
                getService: function (hostname, serviceDescription) {
                },
                getTimePeriod: function (timeperiodName) {
                    var promise = $q.defer(), query = {"timeperiods": {"is": {"timeperiod_name": [timeperiodName] } } };
                    getData([], query, "timeperiods")
                        .then(function (data) {
                            promise.resolve(data);
                        });
                    return promise.promise;
                }
            };
        }]);
