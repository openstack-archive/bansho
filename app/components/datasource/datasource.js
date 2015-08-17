'use strict';

angular.module('bansho.datasource', ['bansho.surveil'])
    .value('tableGlobalConfig', {'cellToFieldsMap': {}, 'cellWrappableField': {}})

    .service('datasource', ['$filter', 'surveilStatus', 'surveilConfig', 'surveilQuery', 'componentsConfig', 'tableGlobalConfig', 'configManager',
        function ($filter, surveilStatus, surveilConfig, surveilQuery, componentsConfig, tableGlobalConfig, configManager) {
            var providerServices = {
                    status: surveilStatus,
                    config: surveilConfig
                },
                config = [],
                data = [],
                filteredData = [],
                listeners = [];

            function notifyDataChanged(datasourceId) {
                angular.forEach(listeners[datasourceId], function (callback) {
                    callback(filteredData[datasourceId], config[datasourceId].isCheckAll);
                });
            }

            function filterData(datasourceId) {
                filteredData[datasourceId] = $filter('filter')(data[datasourceId], config[datasourceId].searchFilter);
                notifyDataChanged(datasourceId);
            }

            function refreshTableData(datasourceId) {
                var conf = config[datasourceId],
                    inputSource = componentsConfig.getInputSource(conf.inputSource),
                    filter = componentsConfig.getFilter(inputSource.filter).filter,
                    promise;

                if (config[datasourceId].queryFilter) {
                    filter = componentsConfig.mergeFilters([config[datasourceId].queryFilter, filter]);
                }

                promise = providerServices[inputSource.provider].getData([], filter, inputSource.endpoint, conf.queryPaging);

                promise.then(function (newData) {
                    data[datasourceId] = newData;
                    config[datasourceId].isCheckAll = false;
                    filterData(datasourceId);
                }, function (error) {
                    throw new Error('getTableData : Query failed' + error);
                });
            }

            return {
                refreshTableData: refreshTableData,
                addTable: function (datasourceId, conf) {
                    config[datasourceId] = conf;
                    config[datasourceId].requestFields = [];
                    //angular.forEach(config[datasourceId].cells.name, function (cell) {
                    //    angular.forEach(tableGlobalConfig.cellToFieldsMap[cell], function (_value) {
                    //        config[datasourceId].requestFields.push(_value);
                    //    });
                    //});

                    if (config[datasourceId].pagingbar) {
                        config[datasourceId].queryPaging = {
                            page: 0,
                            size: configManager.getPagingSize()
                        };
                    }
                },
                getConfig: function (datasourceId) {
                    return config[datasourceId];
                },
                forEachCheckedEntry: function (datasourceId, callbackIsChecked) {
                    angular.forEach(filteredData[datasourceId], function (entry) {
                        if (entry.is_checked) {
                            callbackIsChecked(entry);
                        }
                    });

                    notifyDataChanged(datasourceId);
                },
                registerDataChanged: function (datasourceId, callback) {
                    if (!listeners[datasourceId]) {
                        listeners[datasourceId] = [];
                    }

                    listeners[datasourceId].push(callback);
                },
                setAllCheckTable: function (datasourceId, isChecked) {
                    config[datasourceId].isCheckAll = isChecked;
                    angular.forEach(filteredData[datasourceId], function (entry) {
                        entry.is_checked = isChecked;
                    });

                    notifyDataChanged(datasourceId, isChecked);
                },
                setSearchFilter: function (datasourceId, searchFilter) {
                    config[datasourceId].searchFilter = searchFilter;
                    filterData(datasourceId);
                },
                setQueryFilter: function (datasourceId, queryFilter) {
                    config[datasourceId].queryFilter = queryFilter;
                    refreshTableData(datasourceId);
                },
                nextPage: function (datasourceId) {
                    config[datasourceId].queryPaging.page += 1;
                    refreshTableData(datasourceId);
                },
                previousPage: function (datasourceId) {
                    if (config[datasourceId].queryPaging.page > 0) {
                        config[datasourceId].queryPaging.page -= 1;
                        refreshTableData(datasourceId);
                    }
                },
                getPage: function (datasourceId) {
                    return config[datasourceId].queryPaging.page;
                },
                setPageSize: function (datasourceId, pageSize) {
                    config[datasourceId].queryPaging.size = pageSize;
                    refreshTableData(datasourceId);
                },
                getPageSize: function (datasourceId) {
                    return config[datasourceId].queryPaging.size;
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
