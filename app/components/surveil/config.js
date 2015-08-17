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

            var validEndpoint = {
                "businessimpactmodulations": true,
                "checkmodulations": true,
                "commands": true,
                "contacts": true,
                "contactgroups": true,
                "hosts": true,
                "hostgroups": true,
                "macromodulations": true,
                "notificationways": true,
                "realms": true,
                "services": true,
                "servicegroups": true,
                "timeperiods": true

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
