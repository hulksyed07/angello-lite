angular.module('Angello.Admin').controller('StatusController', function(StatusModel){
	var statusCtrl = this;

	statusCtrl.statuses = {};
	statusCtrl.currentStatus = null;
	statusCtrl.editedStatus = {};

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
		console.log('currentStatus: '+status);
		statusCtrl.editedStatus = angular.copy(statusCtrl.currentStatus);

	}

	statusCtrl.createStatus = function() {
		StatusModel.createStatus(statusCtrl.editedStatus)
		.then(function(result){
			statusCtrl.statuses = result;
		});
		statusCtrl.resetForm();
	}

	statusCtrl.updateStatus = function() {
		StatusModel.updateStatus(statusCtrl.editedStatus)
		.then(function(result){
			statusCtrl.statuses = result;
		});
		statusCtrl.resetForm();
	}

	statusCtrl.deleteStatus = function() {
		StatusModel.deleteStatus(statusCtrl.editedStatus._id)
		.then(function(result){
			statusCtrl.statuses = result;
		});
		statusCtrl.resetForm();
	}

	statusCtrl.updateCancel = function() {
		statusCtrl.resetForm();
	}

	statusCtrl.resetForm = function() {
		statusCtrl.currentStatus = null;
		statusCtrl.editedStatus = {};
	}

	

});