(function () {
	'use strict';

	angular.module('mySweetWeather')

	.component('cityWeather', {
		bindings: {
			city: '<'
		},
		require: {
        	cityList: '^cityList'
    	},
		templateUrl: 'templates/cityWeather.html',
		controller: cityWeatherController
	});

	cityWeatherController.$inject = ['weatherApi', $interval];
	
	function cityWeatherController(weatherApi, $interval) {

		var vm = this;

		vm.$onInit = activate;
		
		vm.weather = {
			temp: 0,
			pressure: 0,
			humidity: 0,
			wind: {
				speed: 0,
				deg: 0
			}
		};

		vm.remove = function () {
			vm.cityList.deleteCity(vm.city.zip);
		};

		function activate() {
			
			getWeather();

			$interval(function () {
				getWeather();
			}, 60 * 1000);
		}

		function getWeather() {

			weatherApi.getWeather(vm.city.zip).then(
				function (weather) {
					vm.weather = weather;
				}
			);
		}
	}
})();