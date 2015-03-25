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
                templateUrl = templateName + '/' + templateName + '.html';

            $scope.templateUrl = templateUrl;
        }])

    .run(['readConfig', 'viewsTemplate', function (readConfig, viewsTemplate) {
        var viewsConfig = readConfig.data;

        angular.forEach(viewsConfig, function (config, view) {
            viewsTemplate[view] = config.template;
        });
    }]);
