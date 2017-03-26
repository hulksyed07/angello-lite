angular.module('Angello.Admin').controller('StatusController', function(StatusModel){
	var statusCtrl = this;

	statusCtrl.statuses = {};

	statusCtrl.getAllStatuses = function(){
		StatusModel.getStatuses()
			.then(function(result){
				console.log('inside status ctrl');
				console.log(result);
				statusCtrl.statuses = result; 
			});
	};

	statusCtrl.getAllStatuses();

	statusCtrl.setCurrentStatus = function(status) {
		statusCtrl.currentStatus = status;
		statusCtrl.editedStatus = angular.copy(statusCtrl.currentStatus);

	}

});