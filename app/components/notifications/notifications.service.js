/*global PNotify, window, Notification */

'use strict';

angular.module('bansho.notifications')
    .service('notifications', [
        function () {
            var sendNotification = function (type, title, message) {
                new Notification(title, {body: message});
            };

            var sendPNotify = function (type, title, message) {
                $(function(){
                    new PNotify({
                        type: type,
                        title: title,
                        text: message,
                        styling: {}
                    });
                });
            };

            var push = function (type, title, message) {
                if (window.Notification && Notification.permission === "granted") {
                    sendNotification(type, title, message);
                } else if (window.Notification && Notification.permission !== "denied") {
                    sendPNotify(type, title, message);

                    // Ask permission for next time
                    Notification.requestPermission(function (status) {
                        if (Notification.permission !== status) {
                            Notification.permission = status;
                        }
                    });
                } else {
                    sendPNotify(type, title, message);
                }
            };

            return {
                "push": push
            };
        }]);
