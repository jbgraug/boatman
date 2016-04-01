'use strict';

describe('boatApp.version module', function() {
  beforeEach(module('boatApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
