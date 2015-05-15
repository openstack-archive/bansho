'use strict';

angular.module('bansho.topbar', ['bansho.live'])

    .controller('TopBarCtrl', ['$rootScope', '$scope', '$interval', 'backendClient', 'promisesManager', 'authService',
        function ($rootScope, $scope, $interval, backendClient, promisesManager, authService) {
            var getData,
                hostProblems,
                serviceProblems;

            getData = function () {
				if ($rootScope.isAuthenticated) {
					backendClient.getServiceProblems().success(function (data) {
						serviceProblems = data.length;
						backendClient.getHostProblems().success(function (data) {
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
			}
        }])

    .directive('banshoTopbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/topbar/topbar.html'
        };
    });
