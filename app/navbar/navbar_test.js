'use strict';

describe('Navbar module', function () {
    var $compile,
        $rootScope,
        $controller,
        $httpBackend;

    beforeEach(module('adagios.navbar'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$controller_, _$httpBackend_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;

        $httpBackend.expectGET('navbar/navbar.html').respond('<a>{{ notifications }}</a>');
    }));

    describe('NavBarCtrl', function () {

        it('should be defined', function () {
            var scope = $rootScope.$new(),
                navbar = $controller('NavBarCtrl', { $scope : scope });

            expect(navbar).toBeDefined();
        });

    });

    describe('Navbar directive', function () {

        it('should insert the number of warnings', function () {
            var element = $compile('<navbar></navbar>')($rootScope);
            $httpBackend.flush();
            $rootScope.notifications = 44;
            $rootScope.$digest();

            expect(element.text()).toBe('44');
        });

    });
});
