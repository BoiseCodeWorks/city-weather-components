(function () {
	'use strict';

	angular.module('mySweetWeather')

	.component('cityList', {
		bindings: {},
		templateUrl: 'templates/cityList.html',
		controller: cityListController
	});

	cityListController.$inject = ['cityStore', 'zipCodeApi'];	

	function cityListController(cityStore, zipCodeApi) {
		
		var ctrl = this;

		ctrl.newZip = '';		
		ctrl.cities = [];
		
		ctrl.addCity = function () {

			if (ctrl.newZip) {
				zipCodeApi.getLocation(ctrl.newZip).then(
					function (data) {
						ctrl.cities = cityStore.addCity({
							name: data.places[0]['place name'],
							state: data.places[0]['state abbreviation'],
							zip: ctrl.newZip
						});

						ctrl.newZip = '';
					}
				);
			}			
		};

		ctrl.deleteCity = function (zip) {
			ctrl.cities = cityStore.deleteCity(zip);
		};

		function activate() {
			cityStore.getcities().then(
				function (cities) {
					ctrl.cities = cities;
				}
			);
		}	

		activate();
	}	
})();