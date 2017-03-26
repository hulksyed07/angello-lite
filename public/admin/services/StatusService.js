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

	service.createStatus = function(status){
		return $http.post('/api/statuses', status)
				.then(function(result){
					console.log('Inside status get all service');
					console.log(result);
					return UtilsService.objectToArray(result);
				});
	}

	service.updateStatus = function(status){
		return $http.put('/api/statuses/'+status._id, status)
				.then(function(result){
					console.log('Inside status get all service');
					console.log(result);
					return UtilsService.objectToArray(result);
				});
	}

	service.deleteStatus = function(status_id){
		return $http.delete('/api/statuses/'+ status_id)
				.then(function(result){
					console.log('Inside status get all service');
					console.log(result);
					return UtilsService.objectToArray(result);
				});
	}
})