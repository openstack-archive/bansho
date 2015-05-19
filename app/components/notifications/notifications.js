'use strict';

angular.module('bansho.notifications', [])
    .service('notifications', [
        function () {

            var push = function (type, message) {
                $(function(){
                    console.log(PNotify);
                    new PNotify({
                        type: type,
                        title: 'Notification',
                        text: message,
                        styling: {},
                    });
                });
            };

            return {
                "push": push
            }

        }]);
