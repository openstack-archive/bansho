
var tactical_app = angular.module('adagios.tactical', ['ngRoute'
                                    ]);

tactical_app.config(['$routeProvider', function($routeProvider) {
        }]);


tactical_app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/tactical', {templateUrl: 'tactical/tactical.html', controller: 'TacticalCtrl'});
}]);

tactical_app.controller('TacticalCtrl', ['$scope', '$http',
        function($scope, $http) {
            $scope.toto = "pl";

/*            $http.get('/core/config').success(function(data) {
                $scope.config = data;
            });


        $scope.save = function(config) {
            $http.post('/core/config', config).success(function(data) {
                messageCenterService.add(data.state, data.message);
            });
        }
*/
    }]);

