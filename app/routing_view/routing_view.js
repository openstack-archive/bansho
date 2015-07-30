/*global jQuery */

'use strict';

angular.module('bansho.view', ['ngRoute',
                                'bansho.config'
                               ])

    .value('viewsTemplate', {})

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view', {
            controller: 'ViewCtrl',
            template: '<div ng-include="templateUrl">Loading...</div>'
        })
        .when('/login', {
            templateUrl: 'components/authentication/authentication.html'
        });
    }])

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
        }])

    .service('loadConfig', ['configManager', 'viewsTemplate', function (configManager, viewsTemplate) {
        return function () {
            var viewsConfig = configManager.readLayoutConfig();

            angular.forEach(viewsConfig, function (config, view) {
                viewsTemplate[view] = config.template;
            });
        };
    }]);
