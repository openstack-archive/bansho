"use strict";

angular.module("bansho.view.drupal", [])

    .controller("DrupalViewCtrl", ["$scope", "$routeParams",
        function ($scope, $routeParams) {
            if (!!$routeParams.id) {
                $scope.drupal_id = $routeParams.id;
            } else {
                throw new Error("ERROR: 'id' GET parameter required");
            }
        }]);
