/*global jQuery */

'use strict';

angular.module('bansho.routingView')
    .controller('ViewCtrl', ['$scope', '$rootScope',  '$location', '$routeParams', '$window', '$timeout', 'viewsTemplate', 'loadConfig',
        function ($scope, $rootScope, $location, $routeParams, $window, $timeout, viewsTemplate, loadConfig) {
            var templateName;

            if (!$rootScope.isAuthenticated) {
                $location.path('/login');
                return;
            }

            if (jQuery.isEmptyObject(viewsTemplate)) {
                loadConfig();
            }

            if (!!$routeParams.view) {
                $scope.viewName = $routeParams.view;
            } else {
                $scope.viewName = $routeParams.view = 'dashboardConfig';
            }

            templateName = viewsTemplate[$scope.viewName];
            $scope.templateUrl = 'templates/' + templateName + '/' + templateName + '.html';
        }
    ]);
