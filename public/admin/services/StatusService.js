angular.module('Angello.Admin').service('StatusModel', function($http, UtilsService){
	var service = this;

	service.getStatuses = function(){
		return $http.get('/api/statuses')
				.then(function(result){
					console.log('Inside status get all service');
					console.log(result);
					return UtilsService.objectToArray(result);
				});
	}
})