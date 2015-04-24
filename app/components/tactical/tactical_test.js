'use strict';

describe('Tactical module', function () {

    beforeEach(module('bansho.tactical'));

    describe('TacticalCtrl', function () {

        it('should be defined', inject(function ($controller) {
            var scope, ctrl;
            scope = {};
            ctrl = $controller('TacticalCtrl', { $scope : scope });

            expect(ctrl).toBeDefined();
        }));

    });
});
