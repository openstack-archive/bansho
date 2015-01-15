'use strict';

describe('Tactical module', function () {

    beforeEach(module('adagios.tactical'));

    describe('TacticalCtrl', function () {

        it('should be defined', inject(function ($controller) {
            var scope, ctrl;
            scope = {};
            ctrl = $controller('NavBarCtrl', { $scope : scope });

            expect(ctrl).toBeDefined();
        }));

    });
});
