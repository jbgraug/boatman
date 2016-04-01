'use strict';

angular.module('boatApp.version', [
  'boatApp.version.interpolate-filter',
  'boatApp.version.version-directive'
])

.value('version', '0.1');
