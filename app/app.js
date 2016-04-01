'use strict';
(function () {
    // Declare app level module which depends on views services & components
    angular.module('boatApp', [
        'ngRoute',
        'boatApp.service.boat',
        'boatApp.service.equipment',
        'boatApp.view.boat',
        'boatApp.view.equipment',
        'boatApp.version'
    ])
            // Add HTM5 SPA functionalities
            .config(['$routeProvider', function ($routeProvider) {
                    // Go to main page
                    $routeProvider.otherwise({redirectTo: '/boat'});
                }])
            .constant("URLS", {
                "BOAT": "//localhost:8080/boats",
                "EQUIPMENT": "//localhost:8080/equipment"
            })
})();