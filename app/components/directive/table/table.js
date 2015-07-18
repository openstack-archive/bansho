'use strict';

angular.module('bansho.table', ['bansho.utils.promiseManager',
                                 'bansho.datasource',
                                 'bansho.actionbar',
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

    .directive('banshoTable', ['datasource', 'tableGlobalConfig',
        function (datasource, tableGlobalConfig) {
            return {
                restrict: 'E',
                scope: {
                    options: '='
                },
                templateUrl: 'components/directive/table/table.html',
                controller: ['$scope', '$interval', 'headerFollow', 'datasource', 'tableGlobalConfig', 'promisesManager', 'pageParams',
                    function ($scope, $interval, headerFollow, datasource, tableGlobalConfig, promisesManager, pageParams) {
                        var conf = {},
                            refreshInterval = pageParams.refreshInterval ? pageParams.refreshInterval : 100000,
                            i;

                        $scope.tableId = $scope.options.attributes.tableId;

                        // Create table configuration
                        conf.title = $scope.options.attributes.title;

                        conf.cells = {'text': [], 'name': []};
                        conf.cells.text = $scope.options.attributes.cells.text;
                        conf.cells.name = $scope.options.attributes.cells.name;

                        conf.inputSource = $scope.options.attributes.inputSource;

                        conf.isWrappable = $scope.$eval($scope.options.attributes.isWrappable);
                        conf.noRepeatCell = $scope.options.attributes.noRepeatCell;

                        datasource.addTable($scope.tableId, conf);

                        // Handle table layout
                        $scope.checkColumn = $scope.options.attributes.checkColumn;

                        if ($scope.options.attributes.headerFollow) {
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

                        $scope.onCheckChange = function () {
                            datasource.setAllCheckTable($scope.tableId, $scope.isCheckAll);
                        };

                        datasource.registerDataChanged($scope.tableId, function (data, isCheckAll) {
                            $scope.isCheckAll = isCheckAll;
                            $scope.entries = data;
                        });
                        datasource.refreshTableData($scope.tableId);

                        if ($scope.options.attributes.refreshInterval && $scope.options.attributes.refreshInterval !== 0) {
                            promisesManager.addAjaxPromise(
                                $interval(function () {
                                    datasource.refreshTableData($scope.tableId);
                                }, refreshInterval)
                            );
                        }
                    }]
            };
        }
    ])

    .directive('banshoCell', ['$http', '$compile', function ($http, $compile) {
        return {
            restrict: 'A',
            compile: function () {
                return function (scope, element, attrs) {
                    if (!attrs.cellName) {
                        throw new Error('<bansho-cell> "cell-name" attribute must be defined');
                    }

                    var template = 'components/directive/table/cell_' + attrs.cellName + '/cell_' + attrs.cellName + '.html';

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

    .filter('wrappableStyle', ['datasource', 'tableGlobalConfig', function (datasource, tableGlobalConfig) {
        return function (input, scope) {
            var last = '',
                entry = {},
                parent_found = false,
                class_name = ['', ''],
                i,
                fieldToWrap = tableGlobalConfig.cellWrappableField[datasource.getConfig(scope.tableId).noRepeatCell];

            if (fieldToWrap === undefined) {
                return input;
            }

            if (datasource.getConfig(scope.tableId).isWrappable) {
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

    .filter('noRepeat', ['datasource', 'tableGlobalConfig', function (datasource, tableGlobalConfig) {
        return function (items, scope) {
            var newItems = [],
                previous,
                fieldToCompare = tableGlobalConfig.cellWrappableField[datasource.getConfig(scope.tableId).noRepeatCell],
                newAttr = datasource.getConfig(scope.tableId).noRepeatCell + "_additionnalClass";

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
