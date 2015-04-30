'use strict';

angular.module('bansho.topbar', ['bansho.live'])

    .controller('TopBarCtrl', ['$scope', '$interval', 'backendClient', 'promisesManager',
        function ($scope, $interval, backendClient, promisesManager) {
            var getData,
                hostProblems,
                serviceProblems;

            getData = function () {
                backendClient.getServiceProblems().success(function (data) {
                    serviceProblems = data.length;
                    backendClient.getHostProblems().success(function (data) {
                        hostProblems = data.length;
                        $scope.allProblems = serviceProblems + hostProblems;
                    });
                });
            };

            // TODO: Change hardcoded interval when the topbar dashboard will be implemented
            promisesManager.addAjaxPromise($interval(getData, 10000));
            getData();
        }])

    .directive('banshoTopbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/topbar/topbar.html'
        };
    });
