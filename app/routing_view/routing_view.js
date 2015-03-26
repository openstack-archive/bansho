'use strict';

angular.module('adagios.view', ['ngRoute',
                                'adagios.config'
                               ])

    .value('viewsTemplate', {})

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view', {
            controller: 'ViewCtrl',
            template: '<div ng-include="templateUrl">Loading...</div>'
        });
    }])

    .controller('ViewCtrl', ['$scope', '$routeParams', 'viewsTemplate',
        function ($scope, $routeParams, viewsTemplate) {
            var templateName = viewsTemplate[$routeParams.view],
                templateUrl = 'templates/' + templateName + '/' + templateName + '.html';

            if (!!$routeParams.view) {
                $scope.viewName = $routeParams.view;
            } else {
                throw new Error("ERROR : 'view' GET parameter must be the custom view name");
            }

            $scope.templateUrl = templateUrl;
        }])

    .run(['readConfig', 'viewsTemplate', function (readConfig, viewsTemplate) {
        var viewsConfig = readConfig.data;

        angular.forEach(viewsConfig, function (config, view) {
            viewsTemplate[view] = config.template;
        });
    }]);
