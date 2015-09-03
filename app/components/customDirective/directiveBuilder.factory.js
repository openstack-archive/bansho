angular.module('bansho.customDirective')
    .factory('directiveBuilder', function () {
        return function (type, index) {
            return "<bansho-" + type + " options=components[" + index + "] />";
        };
    });

