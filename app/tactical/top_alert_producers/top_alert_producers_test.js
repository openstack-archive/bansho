'use strict';

describe('Top Alert Producer tactical submodule', function () {
    var $compile,
        $rootScope,
        $controller,
        $httpBackend;

    beforeEach(module('adagios.tactical.top_alert_producers'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$controller_, _$httpBackend_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;

        $httpBackend.expectGET('tactical/top_alert_producers/top_alert_producers.html')
            .respond('<td>{{ problems }}</td>');
    }));

    describe('TacticalTopAlertProducers', function () {

        it('should be defined', function () {
            var scope, ctrl;
            scope = {};
            ctrl = $controller('TacticalTopAlertProducers', { $scope : scope });

            expect(ctrl).toBeDefined();
        });

    });

    describe('Status overview directive', function () {

        it('should insert the number of warnings', function () {
            var element = $compile('<adg-top-alert-producers></adg-top-alert-producers>')($rootScope);
            $httpBackend.flush();
            $rootScope.problems = 31;
            $rootScope.$digest();

            expect(element.text()).toBe('31');
        });

    });
});
