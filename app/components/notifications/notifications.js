'use strict';

angular.module('bansho.notifications', [])
    .service('notifications', [
        function () {

            var push = function (type, title, message) {
                $(function(){
                    new PNotify({
                        type: type,
                        title: title,
                        text: message,
                        styling: {},
                    });
                });
            };

            return {
                "push": push
            };

        }]);
