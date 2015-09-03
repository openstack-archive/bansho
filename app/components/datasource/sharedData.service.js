angular.module('bansho.datasource')
    .service('sharedData', ['templateManager', 'surveilStatus', 'surveilConfig', 'componentsConfig',
        function (templateManager, surveilStatus, surveilConfig, componentsConfig) {
            var providers = {
                    status: surveilStatus,
                    config: surveilConfig
                },
                data = {};

            var notifyListeners = function (key) {
                angular.forEach(data[key].onChange, function (onChange) {
                    onChange(data[key].value);
                });
            };

            return {
                clear: function (isGlobalCleared) {
                    angular.forEach(data, function (datasource, key) {
                        if (!isGlobalCleared && !datasource.isGlobal || isGlobalCleared) {
                            delete data[key];
                        }
                    });
                },
                getDataFromInputSource: function (source, isCount, keys, isGlobal, onChange) {
                    var listenerKey = source + isCount + JSON.stringify(keys);
                    if (data[listenerKey] === undefined) {
                        data[listenerKey] = {
                            onChange: [onChange],
                            isGlobal: isGlobal,
                            value: null
                        };

                        var inputSource = componentsConfig.getInputSource(source);

                        var update = function () {
                            providers[inputSource.provider].getDataFromInputSource([], inputSource, keys, {count: isCount})
                                .then(function (newData) {
                                    data[listenerKey].value = newData;
                                    notifyListeners(listenerKey);
                                }, function (error) {
                                    throw new Error('getTableData : Query failed' + error);
                                });
                        };
                        update();
                        templateManager.addInterval(isGlobal, update);
                    } else {
                        if (isGlobal) {
                            data[listenerKey].isGlobal = true;
                        }
                        data[listenerKey].onChange.push(onChange);
                        notifyListeners(listenerKey);
                    }

                    return data[listenerKey].value;
                }
            };
        }]
    );
