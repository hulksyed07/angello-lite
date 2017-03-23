angular.module('Angello.Storyboard').service('StoryModel', function($http, UtilsService) {
    var service = this,
        statuses = [
            {name: 'Back Log'},
            {name: 'To Do'},
            {name: 'In Progress'},
            {name: 'Code Review'},
            {name: 'QA Review'},
            {name: 'Verified'},
            {name: 'Done'}
        ],
        types = [
            {name: 'Feature'},
            {name: 'Enhancement'},
            {name: 'Bug'},
            {name: 'Spike'}
        ]
        // ,
        // stories = [
        //     {
        //         title: 'First story',
        //         description: 'Our first story.',
        //         criteria: 'Criteria pending.',
        //         status: 'To Do',
        //         type: 'Feature',
        //         reporter: 'Lukas Ruebbelke',
        //         assignee: 'Brian Ford'
        //     },
        //     {
        //         title: 'Second story',
        //         description: 'Do something.',
        //         criteria: 'Criteria pending.',
        //         status: 'Back Log',
        //         type: 'Feature',
        //         reporter: 'Lukas Ruebbelke',
        //         assignee: 'Brian Ford'
        //     },
        //     {
        //         title: 'Another story',
        //         description: 'Just one more.',
        //         criteria: 'Criteria pending.',
        //         status: 'Code Review',
        //         type: 'Enhancement',
        //         reporter: 'Lukas Ruebbelke',
        //         assignee: 'Brian Ford'
        //     }
        // ]
        ;

    service.getStatuses = function () {
        return statuses;
    };

    service.getTypes = function () {
        return types;
    };

    service.getStories = function () {
        // return stories;

        return $http.get('/api/stories')
            .then( function(result){
                console.log(UtilsService.objectToArray(result));
                return UtilsService.objectToArray(result);
            });

    };

    service.createStory = function(story) {
        return $http.post('/api/stories', story)
                .then(function(result){
                    console.log('create inside service: '+ result);
                    return UtilsService.objectToArray(result);
                });
    };

    service.updateStory = function(story) {
        return $http.put('/api/stories/'+ story._id, story)
                .then(function(result){
                    return UtilsService.objectToArray(result);
                })
    };

    service.deleteStory = function(id) {
        return $http.delete('/api/stories/'+id)
                .then(function(result){
                    return UtilsService.objectToArray(result);
                });
    };
});