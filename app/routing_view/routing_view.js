'use strict';

angular.module('bansho.view', ['ngRoute',
                                'bansho.config'
                               ])

    .value('viewsTemplate', {})

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view', {
            controller: 'ViewCtrl',
            template: '<div ng-include="templateUrl">Loading...</div>'
        });
    }])

    .controller('ViewCtrl', ['$scope', '$routeParams', 'viewsTemplate', 'loadConfig',
        function ($scope, $routeParams, viewsTemplate, loadConfig) {
            var templateName,
                templateUrl;

            if (jQuery.isEmptyObject(viewsTemplate)) {
                loadConfig
            }

            if (!!$routeParams.view) {
                $scope.viewName = $routeParams.view;
            } else {
                $scope.viewName = $routeParams.view = 'dashboardConfig';
            }

            templateName = viewsTemplate[$scope.viewName],
            $scope.templateUrl = 'templates/' + templateName + '/' + templateName + '.html';
        }])

    .service('loadConfig', ['readConfig', 'viewsTemplate', function (readConfig, viewsTemplate) {
        var viewsConfig = readConfig.data;

        angular.forEach(viewsConfig, function (config, view) {
            viewsTemplate[view] = config.template;
        });
    }]);
