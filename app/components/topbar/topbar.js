'use strict';

angular.module('bansho.topbar', ['bansho.surveil'])

    .controller('TopBarCtrl', ['$rootScope', '$scope', '$interval', 'surveilStatus', 'promisesManager', 'authService', 'themeManager',
        function ($rootScope, $scope, $interval, surveilStatus, promisesManager, authService, themeManager) {
            var getData,
                hostProblems,
                serviceProblems;

            getData = function () {
                if ($rootScope.isAuthenticated) {
                    surveilStatus.getServiceProblems().success(function (data) {
                        serviceProblems = data.length;
                        surveilStatus.getHostProblems().success(function (data) {
                            hostProblems = data.length;
                            $scope.allProblems = serviceProblems + hostProblems;
                        });
                    });
                }
            };

            // TODO: Change hardcoded interval when the topbar dashboard will be implemented
            promisesManager.addAjaxPromise($interval(getData, 10000));
            getData();

            $scope.logout = function () {
                authService.logout();
            };

            $scope.switchTheme = function () {
                themeManager.switchTheme();
            };
        }])

    .directive('banshoTopbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/topbar/topbar.html'
        };
    });
