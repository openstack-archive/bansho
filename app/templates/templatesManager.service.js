'use strict';

angular.module('bansho.templates')
    .constant('NO_REFRESH', -1)

    .service('templateManager', ['$interval', 'configManager', 'NO_REFRESH',
        function ($interval, configManager, NO_REFRESH) {
            var pageParam = {},
                layout = {},
                refreshInterval = -1,
                intervals = [];

            return {
                setLayout: function (layoutName) {
                    refreshInterval = configManager.getConfig().refreshInterval;
                    layout = configManager.getConfigData(layoutName);
                },
                getLayoutComponents: function () {
                    return layout.components;
                },
                addInterval: function (isGlobal, callback) {
                    if (refreshInterval !== NO_REFRESH) {
                        intervals.push({isGlobal: isGlobal, interval: $interval(callback, refreshInterval * 1000)});
                    }
                },
                clearIntervals: function (isGlobalCleared) {
                    angular.forEach(intervals, function (i) {
                        if (!isGlobalCleared && !i.isGlobal || isGlobalCleared) {
                            $interval.cancel(i.interval);
                        }
                    });
                },
                setPageParam: function (key, value) {
                    pageParam[key] = value;
                },
                getAllPageParams: function () {
                    return pageParam;
                },
                getPageParam: function (key) {
                    if (pageParam[key] === undefined) {
                        throw new Error("ERROR :'" + key + "' GET parameter must be set in url");
                    }

                    return pageParam[key];
                }
            };
        }]);

