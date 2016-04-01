'use strict';
(function () {
    angular.module('boatApp.view.equipment', ['ngRoute'])
            .config(['$routeProvider', function ($routeProvider) {
                    $routeProvider.when('/equipment', {
                        templateUrl: 'app/equipment/equipment.html',
                        controller: 'EquipmentCtrl',
                        controllerAs: 'eqc'
                    });
                }])
            .controller('EquipmentCtrl', ['equipmentService', EquipmentCtrl]);

    //Implementation
    function EquipmentCtrl(equipmentService) {
        var self = this;
        self.equipmentFull = {};
        self.equipment = [];

        getAllEquipment();

        function getAllEquipment() {
            equipmentService.getAll()
                    .then(function (eq) {
                        self.equipment = eq._embedded.equipment;
                        self.equipmentFull = eq;
                    })
                    .catch(function (e) {
                        console.log(JSON.stringify(e.data));
                    });
        }
    }
})();