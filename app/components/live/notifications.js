'use strict';


angular.module('adagios.live', [])
.factory('GetProblems', ['$http', function($http) {
    // $http.get("/getproblems")
    var problem_number = 44;
    // factory function body that constructs shinyNewServiceInstance
    return problem_number;
}]);
