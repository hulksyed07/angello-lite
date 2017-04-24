angular.module('Angello.Storyboard').directive('story', function(StoryModel) {
    var linker = function(scope, elem, attrs) {
    	elem.on('dragstart', function(event){
    		console.log(event);
    	})
    }

    return {
        scope: true,
        replace: true,
        link: linker,
        template: '<div draggable="true"><h4>{{story.title}}</h4><p>{{story.description}}</p></div>'
    };
});