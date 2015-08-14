'use strict';

angular.module('bansho.view')
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
                addInterval: function (callback) {
                    if (refreshInterval !== NO_REFRESH) {
                        intervals.push($interval(callback, refreshInterval * 1000));
                    }
                },
                clearIntervals: function () {
                    angular.forEach(intervals, function (i) {
                        $interval.cancel(i);
                    });
                },
                setPageParam: function (key, value) {
                    pageParam[key] = value;
                },
                getPageParam: function (key) {
                    if (pageParam[key] === undefined) {
                        throw new Error("ERROR :'" + key + "' GET parameter must be set in url");
                    }

                    return pageParam[key];
                }
            };
        }]);

