'use strict';

describe('Status Overview tactical submodule', function() {

  beforeEach(module('adagios.tactical.status_overview'));

  describe('TacticalStatusOverViewCtrl', function() {

    it('should be defined', inject(function($controller) {
      var scope = {};
      var ctrl = $controller('TacticalStatusOverViewCtrl', {$scope:scope});

      expect(ctrl).toBeDefined();
    }));

  });
});
