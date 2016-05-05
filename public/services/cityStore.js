(function () {
	'use strict';
	
	angular.module('mySweetWeather')
		
	.factory('cityStore', ['$q', function ($q) {

		var STORAGE_ID = 'weather-city-store';
		var cities = [];

		function getFromLocalStorage() {

			var deferred = $q.defer();

			cities = JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
			
			deferred.resolve(cities);
			
			return deferred.promise;
		}

		function saveToLocalStorage() {
			localStorage.setItem(STORAGE_ID, JSON.stringify(cities));
		}

		function addCity(city) {
			
			cities.push(city);
			saveToLocalStorage();

			return cities; 
		}	
		
		function deleteCity(zip) {
			
			cities = _.filter(cities, function(city) {
  				return city.zip !== zip;
			});
			saveToLocalStorage();

			return cities;
		}
		
		return {
			getcities: getFromLocalStorage,
			addCity: addCity,
			deleteCity: deleteCity
		};
	}]);	

})();