'use strict';
(function () {
    angular.module('boatApp.view.boat', ['ngRoute'])
            .config(['$routeProvider', function ($routeProvider) {
                    $routeProvider.when('/boat', {
                        templateUrl: 'app/boat/boat.html',
                        controller: 'BoatCtrl',
                        controllerAs: 'bc'
                    }).when('/boat/:boat_id', {
                        templateUrl: 'app/boat/boatDetail.html',
                        controller: 'BoatCtrl',
                        controllerAs: 'bc'
                    });
                }])

            .controller('BoatCtrl', ['$route', '$location', 'boatService', BoatCtrl]);

    function BoatCtrl($route, $location, boatService) {
        var self = this;
        self.boatFull = {};
        self.boats = [];
        self.selectedBoat = boatService.findById($route.current.params.boat_id);
        self.viewDetail = viewDetails;
        self.saveBoat = saveBoat;
        self.addEquipment = addEquipment;
        self.delEquipment = delEquipment;
        //Executed
        getAllBoats();

        //Implementation

        /**
         * 
         * @returns {[Boat]}
         */
        function getAllBoats() {
            boatService.getAll()
                    .then(function (eq) {
                        self.boats = eq._embedded.boats;
                        self.boatsFull = eq;
                    })
                    .catch(function (e) {
                        console.log(JSON.stringify(e.data));
                    });
        }

        /**
         * 
         * @param {Boat} boat
         */
        function viewDetails(boat) {
            // Get boat's equipment from server
            boatService.getEquipment(boat).then(function (equipment) {
                //Save it locally in the boat
                boat.equipment=equipment;
                //Go to view
                var path = "/boat/" + boat.id;
                $location.path(path);
            });
        }

        /**
         * Saves a new boat
         * 
         * @param {type} newBoat
         * @returns {undefined}
         */
        function saveBoat(newBoat) {
            boatService.save(newBoat)
                    .then(function (createdBoat) {
                        console.log('CREATED:' + JSON.stringify(createdBoat));
                        self.newBoat = {};
                        alert("Boat created Ok!");
                        angular.element('#BoatModalForm').modal('hide');
                    })
                    .catch(function (e) {
                        console.log('ERROR:' + JSON.stringify(e));
                        alert("Error saving the boat!");
                    });
        }
        
        function addEquipment(boat,equipment){
            var exists = boat.equipment.some(function (e){
                if (e.id == equipment.id) {
                    return true
                }
            });
            if (exists){
                alert ("This element has already been added!");
            } else {
                boatService.addEquipment(boat,equipment)
                console.log(JSON.stringify(boat));
            }
        }
        
        function delEquipment(boat,equipment){
           var agreed = confirm("Are you sure?")
            if (agreed){
                boatService.delEquipment(boat,equipment)
                console.log(JSON.stringify(boat));
            }
        }
        
    }
})();