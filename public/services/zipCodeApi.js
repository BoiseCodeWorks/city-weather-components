(function () {
	'use strict';

	angular.module('mySweetWeather')

	.factory('zipCodeApi', ['$q', '$http', function ($q, $http) {

		var urlBase = 'http://api.zippopotam.us/us/';

		function getLocation(zip) {

			var deferred = $q.defer();
			
			$http.get(urlBase + zip).then(function (resp) {
				if (resp.status === 200) {
					deferred.resolve(resp.data);
				}
				else {
					deferred.reject(resp.statusText);
				}
			});
			
			return deferred.promise;
		}

		return {
			getLocation: getLocation
		};
	}]);
})();