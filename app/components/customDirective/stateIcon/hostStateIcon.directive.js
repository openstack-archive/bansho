angular.module('bansho.customDirective.stateIcon')
    .directive('banshoHostStateIcon', function () {
        return {
            restrict: 'EA',
            scope: {
                state: '='
            },
            link: function (scope, element) {
                scope.$watch('state', function () {
                    element.removeClass('state--ok');
                    element.removeClass('state--warning');
                    element.removeClass('state--error');

                    if (scope.state === 'UP') {
                        element.addClass('state--ok');
                    } else if (scope.state === 'DOWN' || scope.state === 'UNREACHABLE') {
                        element.addClass('state--error');
                    }
                });
            }
        };
    });
