'use strict';

describe('Current Health tactical submodule', function () {

    beforeEach(module('adagios.tactical.current_health'));

    describe('TacticalCurrentHealth', function () {

        it('should be defined', inject(function ($controller) {
            var scope, ctrl;
            scope = {};
            ctrl = $controller('NavBarCtrl', { $scope : scope });

            expect(ctrl).toBeDefined();
        }));

    });
});
