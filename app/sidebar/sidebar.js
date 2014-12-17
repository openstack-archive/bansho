'use strict';

angular.module('adagios.sidebar', [])

.controller('SideBarCtrl', ['$scope', '$http',
    function($scope, $http) {
    }])

.directive('sidebar', function() {
  return {
    restrict: 'E',
    templateUrl: "sidebar/sidebar.html"
  };
});


