'use strict';

angular.module('bansho.datasource', ['bansho.surveil'])
    .value('tableGlobalConfig', {'cellToFieldsMap': {}, 'cellWrappableField': {}})

    .service('datasource', ['$filter', 'surveilStatus', 'surveilQuery', 'componentsConfig', 'tableGlobalConfig',
        function ($filter, surveilStatus, surveilQuery, componentsConfig, tableGlobalConfig) {
            var providerServices = {
                    status: surveilStatus
                },
                config = [],
                data = [],
                filteredData = [],
                listeners = [];

            function notifyDataChanged(tableId) {
                angular.forEach(listeners[tableId], function (callback) {
                    callback(filteredData[tableId], config[tableId].isCheckAll);
                });
            }

            function filterData(tableId) {
                filteredData[tableId] = $filter('filter')(data[tableId], config[tableId].searchFilter);
                notifyDataChanged(tableId);
            }

            function refreshTableData(tableId) {
                var conf = config[tableId],
                    inputSource = componentsConfig.getInputSource(conf.inputSource),
                    filter = componentsConfig.getFilter(inputSource.filter).filter,
                    promise;

                if (config[tableId].queryFilter) {
                    filter = componentsConfig.mergeFilters([config[tableId].queryFilter, filter]);
                }

                promise = providerServices[inputSource.provider].getData([], filter, inputSource.endpoint);

                promise.then(function (newData) {
                    data[tableId] = newData;
                    config[tableId].isCheckAll = false;
                    filterData(tableId);
                }, function (error) {
                    throw new Error('getTableData : Query failed' + error);
                });
            }

            return {
                refreshTableData: refreshTableData,
                addTable: function (tableId, conf) {
                    config[tableId] = conf;
                    config[tableId].requestFields = [];
                    angular.forEach(config[tableId].cells.name, function (cell) {
                        angular.forEach(tableGlobalConfig.cellToFieldsMap[cell], function (_value) {
                            config[tableId].requestFields.push(_value);
                        });
                    });
                },
                getConfig: function (tableId) {
                    return config[tableId];
                },
                forEachCheckedEntry: function (tableId, callbackIsChecked) {
                    angular.forEach(filteredData[tableId], function (entry) {
                        if (entry.is_checked) {
                            callbackIsChecked(entry);
                        }
                    });

                    notifyDataChanged(tableId);
                },
                registerDataChanged: function (tableId, callback) {
                    if (!listeners[tableId]) {
                        listeners[tableId] = [];
                    }

                    listeners[tableId].push(callback);
                },
                setAllCheckTable: function (tableId, isChecked) {
                    config[tableId].isCheckAll = isChecked;
                    angular.forEach(filteredData[tableId], function (entry) {
                        entry.is_checked = isChecked;
                    });

                    notifyDataChanged(tableId, isChecked);
                },
                setSearchFilter: function (tableId, searchFilter) {
                    config[tableId].searchFilter = searchFilter;
                    filterData(tableId);

                    notifyDataChanged(tableId);
                },
                setQueryFilter: function (tableId, queryFilter) {
                    config[tableId].queryFilter = queryFilter;
                    refreshTableData(tableId);
                }
            };
        }])

    .service('sharedData', ['$interval', 'surveilStatus',
        function ($interval, surveilStatus) {
            var sharedData = {},
                listeners = {},
                providers = {
                    'nbHostsOpenProblems': function (key) {
                        surveilStatus.getNbHostOpenProblems().then(function (nbHostProblems) {
                            sharedData[key].value = nbHostProblems;
                            notifyListeners(key);
                        });
                    },
                    'nbServicesOpenProblems': function (key) {
                        surveilStatus.getNbServiceOpenProblems().then(function (nbServiceProblems) {
                            sharedData[key].value = nbServiceProblems;
                            notifyListeners(key);
                        });
                    },
                    'nbHosts': function (key) {
                        surveilStatus.getNbHosts().then(function (nbHosts) {
                            sharedData[key].value = nbHosts;
                            notifyListeners(key);
                        });

                    },
                    'nbServices': function (key) {
                        surveilStatus.getNbServices().then(function (nbServices) {
                            sharedData[key].value = nbServices;
                            notifyListeners(key);
                        });
                    },
                    'nbServicesOpenProblemsOnly': function (key) {
                        surveilStatus.getNbServiceOpenProblemsOnly().then(function (nbServices) {
                            sharedData[key].value = nbServices;
                            notifyListeners(key);
                        });
                    },
                    'nbServicesHostsOpenProblems': function (key) {
                        surveilStatus.getNbHostsProblems().then(function (nbHosts) {
                            surveilStatus.getNbServiceOpenProblemsOnly().then(function (nbServices) {
                                sharedData[key].value = nbHosts + nbServices;
                                notifyListeners(key);
                            });
                        });
                    },
                    'nbServicesHostsOpenProblemsDoubleCount': function (key) {
                        surveilStatus.getNbHostsProblems().then(function (nbHosts) {
                            surveilStatus.getNbServiceOpenProblems().then(function (nbServices) {
                                sharedData[key].value = nbHosts + nbServices;
                                notifyListeners(key);
                            });
                        });
                    }
                };

            var notifyListeners = function (key) {
                angular.forEach(listeners[key], function (onChange) {
                    onChange(sharedData[key].value);
                });
            };

            return {
                clear: function () {
                    angular.forEach(sharedData, function (provider) {
                        $interval.cancel(provider.promise);
                    });
                    sharedData = {};
                    listeners = {};
                },
                getData: function (key, interval, onChange) {
                    if (!sharedData[key]) {
                        sharedData[key] = {
                            interval: interval
                        };

                        listeners[key] = [
                            onChange
                        ];

                        providers[key](key);
                        $interval(providers[key](key), interval);
                    } else {
                        listeners[key].push(onChange);

                        if (sharedData[key].interval >= interval) {
                            sharedData[key].interval = interval;
                            $interval.cancel(sharedData[key].promise);
                            sharedData[key].promise = $interval(providers[key](key), interval);
                        }

                    }

                    return sharedData[key].value;
                }
            };
        }]);
