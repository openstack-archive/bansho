'use strict';

angular.module('adagios.navbar', ['adagios.live'])

.controller('NavBarCtrl', ['$scope', '$http', 'GetProblems',
    function($scope, $http, GetProblems) {
        $scope.notifications = GetProblems;
        
    }])

.directive('navbar', function() {
  return {
    restrict: 'E',
    templateUrl: "navbar/navbar.html"
  };
});


