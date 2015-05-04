'use strict';

angular.module('bansho.table.actionbar')

	.directive('banshoAcknowledgeForm',
		['$filter', 'tablesConfig', 'actionbarFilters', 'backendClient',
		function($filter, tablesConfig, actionbarFilters, backendClient) {
		
		return {
			restrict: 'E',
			templateUrl: 'components/table/actionbar/actions/acknowledge_form.html',
			scope: {
				isShown: '='
			},
			controller: function ($scope) {
				$scope.acknowledgeProblems = function () {
					angular.forEach(tablesConfig, function (tableConfig) {
						var entries = $filter('filter')(tableConfig.entries,
							actionbarFilters.searchFilter);

						angular.forEach(entries, function (entry) {
							var service_description;

							if (entry.is_checked) {
								if ('description' in entry) {
									service_description = entry.description;
								}

								backendClient.acknowledge(entry.host_name, service_description, $scope.acknowledgeData).error(function (data) {
										throw new Error('Acknowledge request failed');
									});
							}
						});
					});
				};
			}
		};
	}])

	.directive('banshoDowntimeForm',
		['$filter', 'tablesConfig', 'actionbarFilters', 'backendClient',
		function ($filter, tablesConfig, actionbarFilters, backendClient) {

		return {
			restrict: 'E',
			templateUrl: 'components/table/actionbar/actions/downtime_form.html',
			scope: {
				isShown: '='
			},
			controller: function ($scope) {
				$scope.messages = [];

				$scope.sendDowntime = function () {
					angular.forEach(tablesConfig, function (table) {
						var entries = $filter('filter')(table.entries, actionbarFilters.searchFilter);

						angular.forEach(entries, function (entry) {
							var service_description;

							if (entry.is_checked) {
								if ('description' in entry) {
									service_description = entry.description;
								}

								console.log($scope.attrs);
								backendClient.downtime(entry.host_name, service_description, $scope.attrs).then(function (data) {
									$scope.messages.push({
										text: entry.host_name + " success ",
										type: "success"
									});
								},
								function (error) {
									$scope.messages.push({
										text: entry.host_name + " error",
										type: "error"
									});
								});
							}
						});
					});
				};
			}
		};
	}]);
