'use strict';

describe('Current Health tactical submodule', function () {
    var $compile,
        $rootScope,
        $controller,
        $httpBackend;

    beforeEach(module('adagios.tactical.current_health'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$controller_, _$httpBackend_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;

        $httpBackend.expectGET('tactical/current_health/current_health.html')
            .respond('<th>Current Health</th>');
    }));

    describe('TacticalCurrentHealth', function () {

        it('should be defined', function () {
            var scope, ctrl;
            scope = {};
            ctrl = $controller('TacticalCurrentHealth', { $scope : scope });

            expect(ctrl).toBeDefined();
        });

    });

    describe('Current health directive', function () {

        it('should send a GET request', function () {
            var element = $compile("<adg-current-health></adg-current-health>")($rootScope);
            $httpBackend.flush();

            expect(element.text()).toBe('Current Health');
        });

    });
});
