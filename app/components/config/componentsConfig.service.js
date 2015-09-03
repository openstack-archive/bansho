
angular.module('bansho.config')
    .service('componentsConfig', ['$http', function ($http) {
        var componentsConfig;

        this.getFilter = function (name) {
            return componentsConfig.filters[name];
        };

        this.mergeFilters = function (filters) {
            var filter = {};

            angular.forEach(filters, function (f) {
                angular.forEach(f, function (endpointFilter, endpoint) {
                    if (!filter[endpoint]) {
                        filter[endpoint] = {};
                    }

                    angular.forEach(endpointFilter, function (constraint, constraintType) {
                        if (!filter[endpoint][constraintType]) {
                            filter[endpoint][constraintType] = {};
                        }

                        angular.forEach(constraint, function (value, key) {
                            filter[endpoint][constraintType][key] = value;
                        });
                    });
                });
            });

            return filter;
        };

        this.getInputSource = function (name) {
            return componentsConfig.inputSource[name];
        };

        this.load = function () {
            $http.get('components/config/componentsConfig.json')
                .success(function(config) {
                    componentsConfig = config;
                });
        };
    }]);
