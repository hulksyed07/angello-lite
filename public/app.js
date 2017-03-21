var myModule = angular.module('Angello', []);

myModule.factory('AngelloHelper', function() {
    var buildIndex = function (source, property) {
        var tempArray = [];

        for (var i = 0, len = source.length; i < len; ++i) {
            tempArray[source[i][property]] = source[i];
        }

        return tempArray;
    };

    return {
        buildIndex: buildIndex
    };
});




myModule.service('UtilsService',
        function() {
            var service = this;

            service.objectToArray = function(content) {
                // normalizes data from node and firebase so both get returned as arrays
                if (content.data instanceof Object && !Array.isArray(content.data)) {
                    var newArray = [];

                    for (var key in content.data) {
                        var item = content.data[key];
                        item.id = key;
                        newArray.push(item);
                    }
                    return newArray;
                
                } else {
                    return content.data;
                }
            };
        }
    );





myModule.service('AngelloModel', function($http, UtilsService) {
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
        ],
        stories = [
            {
                title: 'First story',
                description: 'Our first story.',
                criteria: 'Criteria pending.',
                status: 'To Do',
                type: 'Feature',
                reporter: 'Lukas Ruebbelke',
                assignee: 'Brian Ford'
            },
            {
                title: 'Second story',
                description: 'Do something.',
                criteria: 'Criteria pending.',
                status: 'Back Log',
                type: 'Feature',
                reporter: 'Lukas Ruebbelke',
                assignee: 'Brian Ford'
            },
            {
                title: 'Another story',
                description: 'Just one more.',
                criteria: 'Criteria pending.',
                status: 'Code Review',
                type: 'Enhancement',
                reporter: 'Lukas Ruebbelke',
                assignee: 'Brian Ford'
            }
        ];

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
                // return UtilsService.objectToArray(result);
                console.log(UtilsService.objectToArray(result));
                return UtilsService.objectToArray(result);
                // return result;
            });

    };
});

myModule.controller('MainCtrl', function(AngelloModel, AngelloHelper) {
    var main = this;

    main.types = AngelloModel.getTypes();
    main.statuses = AngelloModel.getStatuses();
    main.stories = AngelloModel.getStories();
    console.log(main.stories);
    main.typesIndex = AngelloHelper.buildIndex(main.types, 'name');
    main.statusesIndex = AngelloHelper.buildIndex(main.statuses, 'name');
    main.currentStory = null;
    main.editedStory = {};

    main.setCurrentStory = function (story) {
        main.currentStory = story;
        main.currentStatus = main.statusesIndex[story.status];
        main.currentType = main.typesIndex[story.type];
        main.editedStory = angular.copy(main.currentStory);
    };

    main.createStory = function() {
        main.stories.push(main.editedStory);
        
        main.resetForm();
    };

    main.updateStory = function() {
        var fields = ['title', 'description', 'criteria', 'status', 'type', 'reporter', 'assignee'];
        fields.forEach(function(field){
            main.currentStory[field] = main.editedStory[field];
        });
        main.resetForm();
    };

    main.updateCancel =  function() {
        main.resetForm();
    }

    main.setCurrentStatus = function (status) {
        if (typeof main.editedStory !== 'undefined') {
            main.editedStory.status = status.name;
        }
    };

    main.setCurrentType = function (type) {
        if (typeof main.editedStory !== 'undefined') {
            main.editedStory.type = type.name;
        }
    };

    main.resetForm = function () {
        main.currentStory = null;
        main.editedStory = {};

        main.currentStatus = null;
        main.currentType = null;

        // main.detailsForm.$setPristine();
        // main.detailsForm.$setUntouched();
    };
});

myModule.directive('story', function() {
    return {
        scope: true,
        replace: true,
        template: '<div><h4>{{story.title}}</h4><p>{{story.description}}</p></div>'
    }
});