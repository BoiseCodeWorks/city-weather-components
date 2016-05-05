(function () {
	'use strict';

	angular.module('mySweetWeather')

	.factory('weatherApi', ['$q', '$http', function ($q, $http) {

		var urlBase = 'http://api.openweathermap.org/data/2.5/';
		var appId = 'bd82255fd0a21fa1238699b9eda2ee35';
		
		function getWeather(zip) {

			var deferred = $q.defer();
			var url = urlBase + 'weather?appid=' + appId + '&units=imperial&zip=' + zip;
			
			$http.get(url).then(function (resp) {
				if (resp.status === 200) {

					var weather = {
						cityId: resp.data.id,
						temp: Math.round(resp.data.main.temp),
						pressure: resp.data.main.pressure,
						humidity: resp.data.main.humidity,
						wind: resp.data.wind
					};
					
					deferred.resolve(weather);
				}
				else {
					deferred.reject(resp.statusText);
				}
			});
			
			return deferred.promise;
		}

		function getForecast(id) {

			var deferred = $q.defer();
			var url = urlBase + 'forecast?appid=' + appId + '&units=imperial&id=' + id;
			
			$http.get(url).then(function (data) {
				deferred.resolve(JSON.parse(data));
			});
			
			return deferred.promise;
		}

		return {
			getWeather: getWeather,
			getForecast: getForecast
		};
	}]);
})();