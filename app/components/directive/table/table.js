'use strict';

angular.module('bansho.table', ['bansho.datasource',
                                 'bansho.actionbar',
                                 'bansho.filters',
                                 'bansho.table.cell_single',
                                 'bansho.table.cell_status_host',
                                 'bansho.table.cell_status_event',
                                 'bansho.table.cell_status_service_check',
                                 'bansho.table.cell_status_last_check',
                                 'bansho.table.cell_config_host',
                                 'bansho.table.cell_config_host_register',
                                 'bansho.table.pagingbar',
                                 'ngMaterial'
                                ])

    .directive('banshoTable', function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/directive/table/table.html',
            controller: ['$scope', '$window', 'headerFollow', 'datasource', 'templateManager',
                function ($scope, $window, headerFollow, datasource, templateManager) {
                    // Manage attributes
                    $scope.datasourceId = $scope.options.attributes.datasourceId;
                    $scope.checkColumn = $scope.options.attributes.checkColumn;
                    $scope.pagingbar = $scope.options.attributes.pagingbar;

                    if ($scope.options.attributes.headerFollow) {
                        headerFollow.activate();
                    } else {
                        headerFollow.deactivate();
                    }

                    $scope.cellUrls = $scope.options.attributes.cellUrls;

                    // Handle components
                    $scope.columns = [];
                    angular.forEach($scope.options.components, function (cell) {
                        $scope.columns.push({
                            type: cell.type,
                            title: cell.attributes.title,
                            attributes: cell.attributes
                        });
                    });

                    $scope.createUrl = function (entry, urlParam) {
                        if (urlParam) {
                            var url = "/#/view?view=" + urlParam.view;
                            angular.forEach(urlParam.params, function (paramName) {
                                url += '&' + paramName + '=' + entry[paramName];
                            });
                            $window.location = url;
                        }
                    };

                    datasource.addTable($scope.datasourceId, {
                        columns: $scope.columns,
                        inputSource: $scope.options.attributes.inputSource,
                        pagingbar: $scope.options.attributes.pagingbar,
                    });

                    $scope.onCheckChange = function () {
                        datasource.setAllCheckTable($scope.datasourceId, $scope.isCheckAll);
                    };

                    datasource.registerDataChanged($scope.datasourceId, function (data, isCheckAll) {
                        $scope.isCheckAll = isCheckAll;
                        $scope.entries = data;
                    });
                    datasource.refreshTableData($scope.datasourceId);
                    templateManager.addInterval(function refreshTable () {
                        datasource.refreshTableData($scope.datasourceId);
                    });
                }]
        };
    })

    .directive('banshoCell', ['$http', '$compile', 'tableGlobalConfig',
        function ($http, $compile, tableGlobalConfig) {
            return {
                restrict: 'E',
                compile: function () {
                    return function (scope, element, attrs) {
                        var attributes = attrs.attributes,
                            template = 'components/directive/table/';

                        if (!attrs.type) {
                            throw new Error('Directive bansho-cell "type" attribute must be defined');
                        }

                        if (!attributes) {
                            throw new Error('Directive bansho-cell "attributes" attribute must be defined');
                        }
                        
                        if (attrs.type == 'cell-single') {
                            template += 'cell_single/cell_single.html';
                            scope.attributes = attributes;
                            tableGlobalConfig[attrs.title] = scope.entryKey;
                        } else {
                            var templateName = "cell_" + attrs.type.substring(5).replace(/-/g, "_");
                            template += templateName + '/' + templateName + '.html';
                        }

                        $http.get(template, { cache: true })
                            .success(function (data) {
                                element.replaceWith($compile(data)(scope));
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
                fieldToWrap = tableGlobalConfig.cellWrappableField[datasource.getConfig(scope.datasourceId).noRepeatCell];

            if (fieldToWrap === undefined) {
                return input;
            }

            if (datasource.getConfig(scope.datasourceId).isWrappable) {
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
                fieldToCompare = tableGlobalConfig.cellWrappableField[datasource.getConfig(scope.datasourceId).noRepeatCell],
                newAttr = datasource.getConfig(scope.datasourceId).noRepeatCell + "_additionnalClass";

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
