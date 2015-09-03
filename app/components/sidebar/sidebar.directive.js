'use strict';

angular.module('bansho.sidebar')
    .directive('banshoSidebar', function () {
        return {
            restrict: 'E',
            templateUrl: "components/sidebar/sidebar.html",
            controller: ['$scope', '$location',
                function ($scope, $location) {
                    $scope.getClass = function (path) {
                        var class_name = "";

                        if ($location.url() === path) {
                            class_name = "state--current";
                        }

                        return class_name;
                    };
                }
            ]
        };
    });
