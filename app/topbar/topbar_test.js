'use strict';

describe('Topbar module', function () {
    var $compile,
        $rootScope,
        $controller,
        $httpBackend;

    beforeEach(module('adagios.topbar'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$controller_, _$httpBackend_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;

        $httpBackend.expectGET('topbar/topbar.html').respond('<a>{{ notifications }}</a>');
    }));

    describe('TopBarCtrl', function () {

        it('should be defined', function () {
            var scope = $rootScope.$new(),
                topbar = $controller('TopBarCtrl', { $scope : scope });

            expect(topbar).toBeDefined();
        });

    });

    describe('Topbar directive', function () {

        it('should insert the number of warnings', function () {
            var element = $compile('<topbar></topbar>')($rootScope);
            $httpBackend.flush();
            $rootScope.notifications = 44;
            $rootScope.$digest();

            expect(element.text()).toBe('44');
        });

    });
});
