'use strict';

describe('Status Overview tactical submodule', function () {
    var $compile,
        $rootScope,
        $controller,
        $httpBackend;

    beforeEach(module('adagios.tactical.status_overview'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$controller_, _$httpBackend_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;

        $httpBackend.expectGET('components/tactical/status_overview/status_overview.html')
            .respond('<td>{{ problems }}</td>');
    }));

    describe('TacticalStatusOverViewCtrl', function () {

        it('should be defined', function () {
            var scope, ctrl;
            scope = {};
            ctrl = $controller('TacticalStatusOverViewCtrl', { $scope : scope });

            expect(ctrl).toBeDefined();
        });

    });

    describe('Status overview directive', function () {

        it('should insert the number of warnings', function () {
            var element = $compile('<bansho-status-overview></bansho-status-overview>')($rootScope);
            $httpBackend.flush();
            $rootScope.problems = 31;
            $rootScope.$digest();

            expect(element.text()).toBe('31');
        });

    });
});
