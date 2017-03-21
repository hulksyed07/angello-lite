// set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================

    mongoose.connect('mongodb://localhost/DummyAngularApp');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride('X-HTTP-Method-Override'));

    // listen (start app with node server.js) ======================================
    app.listen(8081);
    console.log("App listening on port 8081");


    
    var Story = mongoose.model('Story', {
        title: String,
        description: String,
        criteria: String,
        status: String,
        type: String,
        reporter: String,
        assignee: String
    });

    // routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all stories
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

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        // res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
        res.sendFile( __dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
