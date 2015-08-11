'use strict';

angular.module('bansho.datasource', ['bansho.surveil'])
    .value('tableGlobalConfig', {'cellToFieldsMap': {}, 'cellWrappableField': {}})

    .service('datasource', ['$filter', 'surveilStatus', 'surveilConfig', 'surveilQuery', 'componentsConfig', 'tableGlobalConfig',
        function ($filter, surveilStatus, surveilConfig, surveilQuery, componentsConfig, tableGlobalConfig) {
            var providerServices = {
                    status: surveilStatus,
                    config: surveilConfig
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

                promise = providerServices[inputSource.provider].getData([], filter, inputSource.endpoint, conf.queryPaging);

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
                    if (config[tableId].pagingbar)
                        config[tableId].queryPaging = {
                            page: 0,
                            size: 50
                        };
                    else
                        config[tableId].queryPaging = {
                            page: -1,
                            size: -1
                        };
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
                },
                setQueryFilter: function (tableId, queryFilter) {
                    config[tableId].queryFilter = queryFilter;
                    refreshTableData(tableId);
                },
                nextPage: function (tableId) {
                    config[tableId].queryPaging.page += 1;
                    refreshTableData(tableId);
                },
                previousPage: function (tableId) {
                    if (config[tableId].queryPaging.page > 0) {
                        config[tableId].queryPaging.page -= 1;
                        refreshTableData(tableId);
                    }
                },
                getPage: function (tableId) {
                    return config[tableId].queryPaging.page;
                },
                setPageSize: function (tableId, pageSize) {
                    config[tableId].queryPaging.size = pageSize;
                    refreshTableData(tableId);
                },
                getPageSize: function (tableId) {
                    return config[tableId].queryPaging.size;
                }
            };
        }])

    .service('sharedData', ['templateManager', 'surveilStatus', 'componentsConfig',
        function (templateManager, surveilStatus, componentsConfig) {
            var providerServices = {
                    status: surveilStatus
                },
                sharedData = {},
                listeners = {},
                providers = {
                    'nbServicesHostsProblems': function () {
                        surveilStatus.getNbHostsProblems().then(function (nbHosts) {
                            surveilStatus.getNbServicesProblems().then(function (nbServices) {
                                sharedData.nbServicesHostsProblems = nbHosts + nbServices;
                                notifyListeners('nbServicesHostsProblems');
                            });
                        });
                    },
                    'nbHostsOpenProblems': function () {
                        surveilStatus.getNbHostOpenProblems().then(function (nbHostProblems) {
                            sharedData.nbHostsOpenProblems = nbHostProblems;
                            notifyListeners('nbHostsOpenProblems');
                        });
                    },
                    'nbServicesOpenProblems': function () {
                        surveilStatus.getNbServiceOpenProblems().then(function (nbServiceProblems) {
                            sharedData.nbServicesOpenProblems = nbServiceProblems;
                            notifyListeners('nbServicesOpenProblems');
                        });
                    },
                    'nbHosts': function () {
                        surveilStatus.getNbHosts().then(function (nbHosts) {
                            sharedData.nbHosts = nbHosts;
                            notifyListeners('nbHosts');
                        });

                    },
                    'nbServices': function () {
                        surveilStatus.getNbServices().then(function (nbServices) {
                            sharedData.nbServices = nbServices;
                            notifyListeners('nbServices');
                        });
                    },
                    'nbServicesOpenProblemsOnly': function () {
                        surveilStatus.getNbServiceOpenProblemsOnly().then(function (nbServices) {
                            sharedData.nbServicesOpenProblemsOnly = nbServices;
                            notifyListeners('nbServicesOpenProblemsOnly');
                        });
                    },
                    'nbServicesHostsOpenProblems': function () {
                        surveilStatus.getNbHostsProblems().then(function (nbHosts) {
                            surveilStatus.getNbServiceOpenProblemsOnly().then(function (nbServices) {
                                sharedData.nbServicesHostsOpenProblems = nbHosts + nbServices;
                                notifyListeners('nbServicesHostsOpenProblems');
                            });
                        });
                    },
                    'nbServicesHostsOpenProblemsDoubleCount': function () {
                        surveilStatus.getNbHostsProblems().then(function (nbHosts) {
                            surveilStatus.getNbServiceOpenProblems().then(function (nbServices) {
                                sharedData.nbServicesHostsOpenProblemsDoubleCount = nbHosts + nbServices;
                                notifyListeners('nbServicesHostsOpenProblemsDoubleCount');
                            });
                        });
                    }
                };

            var notifyListeners = function (key) {
                angular.forEach(listeners[key], function (onChange) {
                    onChange(sharedData[key]);
                });
            };

            return {
                getData: function (key, onChange) {
                    if (listeners[key] === undefined) {
                        listeners[key] = [onChange];
                        templateManager.addInterval(providers[key]);
                        providers[key]();
                    } else {
                        listeners[key].push(onChange);
                    }

                    return sharedData[key];
                },
                getDataFromInputSource: function (source, onChange) {
                    if (listeners[source] === undefined) {
                        listeners[source] = [onChange];

                        var inputSource = componentsConfig.getInputSource(source);

                        providers[source] = function () {
                            providerServices[inputSource.provider].getData([], componentsConfig.getFilter(inputSource.filter).filter, inputSource.endpoint)
                                .then(function (newData) {
                                    sharedData[source] = newData;
                                    notifyListeners(source);
                                }, function (error) {
                                    throw new Error('getTableData : Query failed' + error);
                                });
                        };

                        templateManager.addInterval(providers[source]);
                        providers[source]();
                    } else {
                        listeners[source].push(onChange);
                    }

                    return sharedData[source];
                }
            };
        }]);
