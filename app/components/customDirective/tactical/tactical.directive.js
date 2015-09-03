'use strict';

angular.module('bansho.customDirective.tactical')
    .directive('banshoTactical', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/customDirective/tactical/tactical.html',
            scope: {
                options: '='
            },
            controller: ['$scope', 'surveilStatus', 'sharedData',
                function ($scope, surveilStatus, sharedData) {
                    $scope.title = $scope.options.attributes.title;

                    $scope.statusOverview = $scope.options.attributes.statusOverview;
                    $scope.currentHealth = $scope.options.attributes.currentHealth;
                    $scope.topAlertProducers = $scope.options.attributes.topAlertProducers;

                    $scope.totalHosts = sharedData.getDataFromInputSource('statusHosts', true, null, false, function (data) {
                        $scope.totalHosts = data;
                        $scope.hostsRatio = ($scope.totalHosts - $scope.hostProblems) / $scope.totalHosts * 100;
                    });

                    $scope.hostProblems = sharedData.getDataFromInputSource('statusHostsOpenProblems', true, null, false, function (data) {
                        $scope.hostProblems = data;
                        $scope.hostsRatio = ($scope.totalHosts - $scope.hostProblems) / $scope.totalHosts * 100;
                    });

                    $scope.totalServices = sharedData.getDataFromInputSource('statusServices', true, null, false, function (data) {
                        $scope.totalServices = data;
                        $scope.servicesRatio = ($scope.totalServices - $scope.serviceProblems) / $scope.totalServices * 100;
                    });

                    $scope.serviceProblems = sharedData.getDataFromInputSource('statusServicesOpenProblems', true, null, false, function (data) {
                        $scope.serviceProblems = data;
                        $scope.servicesRatio = ($scope.totalServices - $scope.serviceProblems) / $scope.totalServices * 100;
                    });

                    // Togglable tabs
                    // Don't follow hyperlinks
                    $('a[data-toggle="tab"]').on('click', function (evt) {
                        evt.preventDefault();
                    });
                }
            ]
        };
    });
