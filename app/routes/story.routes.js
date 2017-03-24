var Story = require('../models/StoryModel.js');

module.exports = function(app){
    

    app.get('/api/stories', function(req, res) {

    // use mongoose to get all stories in the database
        Story.find(function(err, stories) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(stories); // return all stories in JSON format
        });
    });

    // create story and send back all stories after creation
    app.post('/api/stories', function(req, res) {

        // create a story, information comes from AJAX request from Angular
        // var story = new Story(req.body);
        // story.save(function(err, story){
        Story.create( req.body , function(err, story) {
        
            if (err)
                res.send(err);

            // get and return all the stories after you create another
            Story.find(function(err, stories) {
                if (err)
                    res.send(err)
                res.json(stories);
            });
        });

    });

    app.put('/api/stories/:story_id', function(req, res) {

        // create a story, information comes from AJAX request from Angular
        // var story = new Story(req.body);
        // story.save(function(err, story){
        Story.update({ _id: req.params.story_id }, req.body, function(err, story) {
        
            if (err)
                res.send(err);

            // get and return all the stories after you create another
            Story.find(function(err, stories) {
                if (err)
                    res.send(err)
                res.json(stories);
            });
        });

    });

    // delete a story
    app.delete('/api/stories/:story_id', function(req, res) {
        Story.remove({
            _id : req.params.story_id
        }, function(err, story) {
            if (err)
                res.send(err);

            // get and return all the stories after you create another
            Story.find(function(err, stories) {
                if (err)
                    res.send(err)
                res.json(stories);
            });
        });
    });
};