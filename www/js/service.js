angular.module('mdl.service', [])
.factory('MdlService', ['$http', '$q',
					function($http, $q) {


	// URL var, to change for dev purposes. Change it when you're pulling from another dev, but specifiy the URL change in the commit.
	var symfonyUrl = 'http://localhost:8888/PPE1/Symfony/web/app_dev.php';

	// This kinda initiate the whole promise thing. Don't touch it.
	function wrapped$httpPromise(httpCallConfig) {
		var deferred = $q.defer();

		$http(httpCallConfig).
			success(function(body) {
				deferred.resolve(body);
			}).
			error(function (data) {
				deferred.reject(data);
			});
		return deferred.promise;
	};

	//Here are your multiple requests that will establish communication with the REST service.
	return {
    login : function(login, password){
      return wrapped$httpPromise(
				{
        method: 'GET',
        headers: {'Content-Type': "application/x-www-form-urlencoded"},
        url: symfonyUrl+'/user/'+login+'/'+password
      });
    },

	getLeagueList: function(){
			return wrapped$httpPromise({
				method: 'GET',
				headers: {'Content-Type': "application/x-www-form-urlencoded"},
				url: symfonyUrl+'/leagues/'
			});
		},
		getLeague: function(league_id){
			return wrapped$httpPromise({
				method:'GET',
				headers: {'Content-Type': "application/x-www-form-urlencoded"},
				url: symfonyUrl+'/league/'+league_id
			});
		}
	}
}
]);
