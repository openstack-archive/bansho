'use strict';

angular.module('bansho.topbar', ['bansho.live'])

    .controller('TopBarCtrl', ['$scope', '$interval', 'getServiceProblems', 'getHostProblems', 'addAjaxPromise',
        function ($scope, $interval, getServiceProblems, getHostProblems, addAjaxPromise) {
            var getData,
                hostProblems,
                serviceProblems;

            getData = function () {
                getServiceProblems().success(function (data) {
                    serviceProblems = data.length;
                    getHostProblems().success(function (data) {
                        hostProblems = data.length;
                        $scope.allProblems = serviceProblems + hostProblems;
                    });
                });
            };

            // TODO: Change hardcoded interval when the topbar dashboard will be implemented
            addAjaxPromise($interval(getData, 10000));
            getData();
        }])

    .directive('banshoTopbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/topbar/topbar.html'
        };
    });
