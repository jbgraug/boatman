'use strict';
(function () {
    angular.module('boatApp.service.boat', [])
            .service('boatService', ['$http', '$q', 'URLS', boatService]);

    function boatService($http, $q, URLS) {
        var self = this;
        self.boats = [];


        // Interface
        var service = {
            getAll: getAll,
            save: save,
            getEquipment:getEquipment,
            addEquipment: addEquipment,
            delEquipment:delEquipment,
            findById: findById
        };

        return service;

        // Implementation

        function getAll() {
            return $http.get(URLS.BOAT).then(onSuccess);

            function onSuccess(response) {
                if (response.status === 200) {
                    self.boats = response.data._embedded.boats;
                    return response.data;
                } else {
                    return $q.reject(new Error(response.data));
                }
            }
        }

        function findById(id) {
            var foundBoat = {}
            self.boats.some(function (boat) {
                if (boat.id == id) {
                    foundBoat = boat;
                    return true;
                }
                ;
            })
            return foundBoat;
        }

        function save(boat) {
            var options = {
                "method": "POST",
                "url": URLS.BOAT,
                "headers": {"Content-Type": "application/json"},
                "data": JSON.stringify(boat)
            };
            
            return $http(options).then(onSuccess);
            
            function onSuccess(response) {
                if (response.status === 201) {
                    // 201 Created
                    self.boats.push(response.data);
                    return response.data;
                } else {
                    return $q.reject(new Error(response.data));
                }
            }
        }
        
        function getEquipment(boat){
               var options = {
                "method": "GET",
                "url": boat._links.equipment.href
            };
            
            return $http(options).then(onSuccess);
            
            function onSuccess(response) {
                if (response.status == 200) {
                    return response.data._embedded.equipment;
                } else {
                    return $q.reject(new Error(response.data));
                }
            }
        }

        function addEquipment(boat, equipment) {
            var options = {
                "method": "POST",
                "url": boat._links.equipment.href,
                "headers": {"Content-Type": "text/uri-list"},
                "data": equipment._links.self.href // + '\n' + boat._links.self.href
            };
            
            return $http(options).then(onSuccess);
            
            function onSuccess(response) {
                if (response.status === 204) {
                    //204 OK - No content // default Spring boot Update response
                    boat.equipment.push(equipment);
                    return response.data;
                } else {
                    return $q.reject(new Error(response.data));
                }
            }
        }
        
        function delEquipment(boat, equipment) {
            var options = {
                "method": "DELETE",
                "url": boat._links.equipment.href + '/' + equipment.id,
                "headers": {"Content-Type": "text/uri-list"},
                "data": equipment._links.self.href // + '\n' + boat._links.self.href
            };
            
            return $http(options).then(onSuccess);
            
            function onSuccess(response) {
                if (response.status === 204) {
                    //204 OK - No content // default Spring boot Update response
                    //Delete locally
                    boat.equipment.some(function(elem,index){
                        if (elem.id === equipment.id) {
                             boat.equipment.splice(index, 1);
                            return true
                        }
                    })
                    return response.data;
                } else {
                    return $q.reject(new Error(response.data));
                }
            }
        }
    }
})();
        