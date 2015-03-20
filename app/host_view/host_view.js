'use strict';

angular.module('adagios.view.host_view', ['ngRoute',
                                          'adagios.live'
                                         ])

    .value('hostViewConfig', {})

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/host_view', {
            templateUrl: 'host_view/host_view.html',
            controller: 'HostViewCtrl'
        });
    }])

    .controller('HostViewCtrl', ['$scope', '$routeParams',
        function ($scope, $routeParams) {

        if (!!$routeParams.view) {
            viewName = $routeParams.view;
        } else {
            throw new Error("ERROR : 'view' GET parameter must be the host");
        }

        getServices(fields, filters, apiName)
            .success(function (data) {
                $scope.nbHostProblems = data.length;
            });
    }])

