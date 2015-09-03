angular.module('bansho.authentication')
    .service('session', ['$cookies', function ($cookies) {
        this.isUserConnected = function () {
            return $cookies.connected === 'true';
        };

        this.create = function (sessionId, expirationTime) {
            this.sessionId = sessionId;
            this.expirationTime = expirationTime;
            $cookies.connected = 'true';
        };

        this.destroy = function () {
            this.sessionId = null;
            this.expirationTime = null;
            $cookies.connected = 'false';
        };
    }]);
