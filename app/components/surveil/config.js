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
                            promise.resolve(data);
                        }
                    });

                    return promise.promise;
                }
            };
        }]);
