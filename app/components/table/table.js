'use strict';

angular.module('bansho.table', ['bansho.surveil',
                                 'bansho.utils.promiseManager',
                                 'bansho.table.actionbar',
                                 'bansho.table.actionbar_events',
                                 'bansho.filters',
                                 'bansho.table.cell_status_host',
                                 'bansho.table.cell_status_event',
                                 'bansho.table.cell_status_event_event_type',
                                 'bansho.table.cell_status_event_output',
                                 'bansho.table.cell_status_event_host_name',
                                 'bansho.table.cell_status_event_service',
                                 'bansho.table.cell_status_duration',
                                 'bansho.table.cell_status_service_check',
                                 'bansho.table.cell_status_last_check',
                                 'bansho.table.cell_status_host_address',
                                 'bansho.table.cell_status_host_status',
                                 'ngMaterial'
                                ])

    .value('tableGlobalConfig', {'cellToFieldsMap': {}, 'cellWrappableField': {}})

    .service('tables', ['surveilStatus', 'tableGlobalConfig',
                        function (surveilStatus, tableGlobalConfig) {
        var inputSourceServices = {
                surveilStatus: surveilStatus
            },
            config = [],
            listeners = [];

            function notifyDataChanged(tableId) {
                angular.forEach(listeners[tableId], function (callback) {
                    callback(config[tableId].data, config[tableId].isCheckAll);
                });
            }
        // Todo separate data from config

        return {
            refreshTableData: function (tableId) {
                var table = config[tableId],
                    promise = inputSourceServices['surveilStatus'].getTableData(table['requestFields'], table.inputSource.config);
                promise.then(function (data) {
                    table.data = data;
                    //table.isCheckAll = false;
                    notifyDataChanged(tableId, table.isCheckAll);
                }, function (error) {
                    throw new Error('getTableData : Query failed' + error);
                })
            },
            addTable: function (tableId, conf) {
                // TODO bizarre
                config[tableId] = conf;
                var currentTable = config[tableId];

                currentTable['requestFields'] = []
                angular.forEach(currentTable.cells.name, function (tableId) { // TODO Cell id ?
                    angular.forEach(tableGlobalConfig.cellToFieldsMap[tableId], function (_value) {
                        currentTable['requestFields'].push(_value);
                    });
                });
            },
            getConfig: function (tableId) {
                return config[tableId];
            },
            getCheckedEntries: function (tableId, callbackIsChecked) {
                angular.forEach(config[tableId].data, function (entry) {
                    if (entry.is_checked) {
                        callbackIsChecked(entry);
                    }
                });

                notifyDataChanged(tableId);
            },
            setListenerDataChanged: function (tableId, callback) {
                if (!listeners[tableId]) {
                    listeners[tableId] = [];
                }

                listeners[tableId].push(callback);
            },
            setAllCheckTable: function (tableId, isChecked) {
                angular.forEach(config[tableId].data, function (entry) {
                    entry.is_checked = isChecked;
                });

                notifyDataChanged(tableId, isChecked);
            }
            //this.setFilters = function (tableId, filters) {
            //this.getFilters = function (tableId) {
        };
    }])

    .controller('TableCtrl', ['$scope', '$interval', 'headerFollow', 'surveilStatus', 'tables', 'tableGlobalConfig', 'promisesManager',
        function ($scope, $interval, headerFollow, surveilStatus, tables, tableGlobalConfig,
                  promisesManager) {
            var conf = tables.getConfig($scope.tableId),
                globalConfig = tableGlobalConfig,
                i;

            if (conf.headerFollow) {
                headerFollow.activate();
            } else {
                headerFollow.deactivate();
            }

            $scope.cellsName = conf.cells.name;
            $scope.cellsText = conf.cells.text;
            $scope.cellIndexes = [];
            for (i = 0; i < $scope.cellsName.length; i += 1) {
                $scope.cellIndexes.push(i);
            }

            $scope.onCheckChange = function() {
                 tables.setAllCheckTable($scope.tableId, $scope.isCheckAll);
            };

            tables.setListenerDataChanged($scope.tableId, function (data, isCheckAll) {
                //$scope.isCheckAll = isCheckAll;
                $scope.entries = data;
            });
            tables.refreshTableData($scope.tableId);
            if (globalConfig.refreshInterval !== 0) {
                promisesManager.addAjaxPromise(
                    $interval(function () {
                        tables.refreshTableData($scope.tableId);
                    }, globalConfig.refreshInterval)
                );
            }
        }])

    .directive('banshoTable', ['$http', '$compile', 'tables', 'tableGlobalConfig',
        function ($http, $compile, tables, tableGlobalConfig) {
            return {
                restrict: 'E',
                scope: {
                    tableId: '='
                },
                compile: function () {
                    return function (scope, element, attrs) {

                        var template = 'components/table/table.html',
                            conf;

                        if (!attrs.cellsText || !attrs.cellsName || !attrs.inputSource || !attrs.isWrappable) {
                            throw new Error('<bansho-table> "cells-text", "cells-name", "inputSource" and "is-wrappable" attributes must be defined');
                        }

                        // Create table configuration
                        conf = {};
                        conf.cells = { 'text': [], 'name': [] };
                        conf.cells.text = attrs.cellsText.split(',');
                        conf.cells.name = attrs.cellsName.split(',');

                        conf.inputSource = JSON.parse(attrs.inputSource);

                        conf.isWrappable = JSON.parse(attrs.isWrappable);
                        conf.noRepeatCell = attrs.noRepeatCell;
                        conf.headerFollow = scope.$eval(attrs.headerFollow);

                        tables.addTable(scope.tableId, conf)

                        //tableGlobalConfig.tableId = attrs.tableId;
                        scope.checkColumn = scope.$eval(attrs.checkColumn);

                        if (!!attrs.refreshInterval) {
                            tableGlobalConfig.refreshInterval = parseInt(attrs.refreshInterval * 1000, 10);
                        }


                        $http.get(template, { cache: true })
                            .success(function (data) {
                                var elem = $compile(data)(scope);
                                element.append(elem);
                            });
                    };
                }
            };
        }])

    .directive('banshoCell', ['$http', '$compile', function ($http, $compile) {
        return {
            restrict: 'A',
            compile: function () {
                return function (scope, element, attrs) {
                    if (!attrs.cellName) {
                        throw new Error('<bansho-cell> "cell-name" attribute must be defined');
                    }

                    var template = 'components/table/cell_' + attrs.cellName + '/cell_' + attrs.cellName + '.html';

                    $http.get(template, { cache: true })
                        .success(function (data) {
                            var td = $compile(data)(scope);
                            // HACK : replaceWith is a necessary hack because <tr> only accepts <td> as a child
                            element.replaceWith(td);
                        });
                };
            }
        };
    }])

    .value('TableConfigObj', function (config) {
        this.title = config.title;
        this.CellsText = config.cells.text.join();
        this.CellsName = config.cells.name.join();
        this.InputSource = config.inputSource;
        this.IsWrappable = config.isWrappable;
        this.ContainsActionBar = config.containsActionBar;
        this.CheckColumn = config.checkColumn;
        this.HeaderFollow = config.headerFollow;
        this.NoRepeatCell = config.noRepeatCell;
    })

    /*
    .filter('wrappableStyle', ['tables', function (tables) {
        return function (input, scope) {
            var last = '',
                entry = {},
                parent_found = false,
                class_name = ['', ''],
                i,
                fieldToWrap = tableGlobalConfig.cellWrappableField[tablesConfig[scope.tableIndex].noRepeatCell];

            if (fieldToWrap === undefined) {
                return input;
            }

            if (tablesConfig[scope.tableIndex].isWrappable) {
                class_name = ['state--hasChild', 'state--isChild'];
            }

            for (i = 0; i < input.length; i += 1) {
                entry = input[i];

                if (entry[fieldToWrap] === last) {
                    if (!input[i - 1].has_child && !parent_found) {
                        input[i - 1].has_child = 1;
                        input[i - 1].child_class = class_name[0];
                        entry.child_class = class_name[1];

                        parent_found = true;
                    } else {
                        entry.is_child = 1;
                        entry.child_class = class_name[1];
                    }
                } else {
                    parent_found = false;
                }

                last = entry[fieldToWrap];
            }

            return input;
        };
    }])

    .filter('noRepeat', ['tablesConfig', 'tableGlobalConfig', function (tablesConfig, tableGlobalConfig) {
        return function (items, scope) {
            console.log(tableGlobalConfig)
            console.log(tablesConfig[scope.tableId])
            var newItems = [],
                previous,
                fieldToCompare = tableGlobalConfig.cellWrappableField[tablesConfig[scope.tableId].noRepeatCell],
                newAttr = tablesConfig[scope.tableIndex].noRepeatCell + "_additionnalClass";

            angular.forEach(items, function (item) {

                if (previous === item[fieldToCompare]) {
                    item[newAttr] = 'state--rmChild';
                } else {
                    previous = item[fieldToCompare].slice(0);
                    if (!!item[newAttr]) {
                        item[newAttr] = item[newAttr].replace("state--rmChild", "");
                    }
                }
                newItems.push(item);
            });

            return newItems;
        };
    }])
*/
    .service('headerFollow', ['$window', function ($window){
        var isFollowing = false, staticHead, followingHead, actionBar = false, actionBarEl, staticActionBar,
            staticActionBarYOffset, staticHeadYOffset, yThreshold, yOffset;

        function enableFollowingMode() {
            isFollowing = true;
            setFollowingModeCss();
        }

        function setFollowingModeCss() {
            // We need to show moving head
            followingHead.css("display", "table-header-group");
            // Resize thead col width
            var thList = staticHead.children("tr").children("th");
            angular.forEach(thList, function(th, key) {
                $(followingHead.children("tr").children("th")[key]).css("width", $(th).css("width"));
            });
            // If we have an actionbar
            if (actionBar) {
                // Set actionbar css
                staticActionBar.css("top", "0");
                staticActionBar.css("position", "fixed");
                if (followingHead.css("width") != "0px") {
                    staticActionBar.css("width", followingHead.css("width"));
                }
                // Set top css to moving head
                followingHead.css("top", staticActionBar.css("height"));
            }
        }

        function disableFollowingMode(){
            isFollowing = false;
            setStaticModeCss();
        }

        function setStaticModeCss(){
            // We need to hide moving head
            followingHead.css("display", "none");
            // Resize thead col width
            var thList = staticHead.children("tr").children("th");
            angular.forEach(thList, function(th, key) {
                $(followingHead.children("tr").children("th")[key]).css("width", "auto");
            });
            // If we have an actionbar
            if (actionBar) {
                // We need to fix moving actionbar
                staticActionBar.css("position", "relative");
                if (followingHead.css("width") != "0px") {
                    staticActionBar.css("width", "auto");
                }
            }
        }

        function calculateThreshold() {
            // Get YThreshold
            staticHeadYOffset = $(staticHead).position().top;
            if (actionBar) {
                yThreshold = Math.min(staticActionBarYOffset, staticHeadYOffset);
            }
            else {
                yThreshold = staticHeadYOffset;
            }
        }

        function scrollEvent() {
            yOffset = $window.pageYOffset;

            if (!isFollowing) {
                // Get init data
                staticHead = $("thead.static-thead");
                followingHead = $(staticHead).parent().children("thead.moving-thead");
                // Prepare action bar
                if (actionBar) {
                    staticActionBar = actionBarEl.children("menu");
                    staticActionBarYOffset = $(staticActionBar).position().top;
                }
                calculateThreshold();
            }

            if (yOffset >= yThreshold){
                enableFollowingMode();
            }
            else {
                disableFollowingMode();
            }
        }
        this.activate = function () {
            // Handle header fixed
            angular.element(document).ready(function () {

                // Prepare action bar
                actionBarEl = $("bansho-table-actionbar");
                if (actionBarEl.length > 0) {
                    actionBar = true;
                }

                // Handle scroll event
                angular.element(document).on("scroll", scrollEvent);

                // Handle resize event
                $($window).resize(function() {
                    if (isFollowing) {
                        setFollowingModeCss();
                    }
                    else {
                        setStaticModeCss();
                    }
                });
            });
        };

        this.deactivate = function () {
            angular.element(document).off("scroll", scrollEvent);
        };
    }]);
