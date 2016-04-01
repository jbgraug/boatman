'use strict';
(function () {
    angular.module('boatApp.service.equipment', [])
            .service('equipmentService', ['$http', '$q', 'URLS', equipmentService]);

    function equipmentService($http, $q, URLS) {
        var self = this;

        // Interface
        var service = {
            check: check,
            getAll: getAll
        };

        return service;

        // Implementation
        function check(s) {
            return "EquipmentService, Hola " + s + " - " + URLS.EQUIPMENT;
        }

        function getAll() {
            return $http.get(URLS.EQUIPMENT).then(onSuccess);
            
            function onSuccess(response) {
                if (response.status===200) {
                    return response.data;
                } else {
                    return $q.reject(new Error(response.data));
                }
            }
        }
    }
})();