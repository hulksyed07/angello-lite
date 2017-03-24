angular.module('Angello.Storyboard').controller('StoryboardCtrl', function(StoryModel, AngelloHelper, $http) {
    var storyboard = this;

    storyboard.types = StoryModel.getTypes();
    storyboard.statuses = StoryModel.getStatuses();
    storyboard.stories = {};
    storyboard.getAllStories = function() {
        StoryModel.getStories()
            .then( function(result) {
                storyboard.stories = result ;
            });

    };

    storyboard.getAllStories();

    storyboard.typesIndex = AngelloHelper.buildIndex(storyboard.types, 'name');
    storyboard.statusesIndex = AngelloHelper.buildIndex(storyboard.statuses, 'name');
    storyboard.currentStory = null;
    storyboard.editedStory = {};
    // storyboard.isNewStory = function() {
    //     console.log(angular.equals({}, storyboard.editedStory));
    //     return (angular.equals({}, storyboard.editedStory));
    // }
    storyboard.showDeleteButton = false ;
    // console.log(storyboard.isNewStory());

    storyboard.setCurrentStory = function (story) {
        storyboard.currentStory = story;
        storyboard.currentStatus = storyboard.statusesIndex[story.status];
        storyboard.currentType = storyboard.typesIndex[story.type];
        storyboard.editedStory = angular.copy(storyboard.currentStory);
        storyboard.showDeleteButton = true ;
    };

    // storyboard.createStory = function() {
    //     console.log(storyboard.editedStory);
    //     $http.post('/api/stories', storyboard.editedStory).
    //     success(function(result){
    //         storyboard.stories = result ;
    //     });
    //     storyboard.resetForm();
    // };

    // storyboard.updateStory = function() {
    //     // var fields = ['title', 'description', 'criteria', 'status', 'type', 'reporter', 'assignee'];
    //     // fields.forEach(function(field){
    //     //     storyboard.currentStory[field] = storyboard.editedStory[field];
    //     // });
    //     $http.put('/api/stories/'+ storyboard.editedStory._id, storyboard.editedStory)
    //     .success(function(result){
    //         storyboard.stories = result ;
    //     })
    //     storyboard.resetForm();
    // };

    storyboard.createStory = function() {
        console.log(storyboard.editedStory);
        StoryModel.createStory(storyboard.editedStory)
        .then(function(result){
            console.log('create inside ctrl: '+ result);
            storyboard.stories = result;
        });
        storyboard.resetForm();
    };    

    

    storyboard.updateStory = function() {
        StoryModel.updateStory(storyboard.editedStory)
        .then(function(result){
            console.log('update inside ctrl: '+ result);
            storyboard.stories = result;
        });
        storyboard.resetForm();
    };

    storyboard.updateCancel =  function() {
        storyboard.resetForm();
    };

    storyboard.deleteStory = function() {
        StoryModel.deleteStory(storyboard.editedStory._id)
        .then(function(result){
            console.log('delete inside ctrl: '+ result);
            storyboard.stories = result;
        });
        storyboard.resetForm();
    };

    storyboard.setCurrentStatus = function (status) {
        if (typeof storyboard.editedStory !== 'undefined') {
            storyboard.editedStory.status = status.name;
        }
    };

    storyboard.setCurrentType = function (type) {
        if (typeof storyboard.editedStory !== 'undefined') {
            storyboard.editedStory.type = type.name;
        }
    };

    storyboard.resetForm = function () {
        storyboard.currentStory = null;
        storyboard.editedStory = {};

        storyboard.currentStatus = null;
        storyboard.currentType = null;

        // storyboard.detailsForm.$setPristine();
        // storyboard.detailsForm.$setUntouched();
    };
});
