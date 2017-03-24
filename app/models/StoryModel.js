// var Story = mongoose.model('Story', {
//     title: String,
//     description: String,
//     criteria: String,
//     status: String,
//     type: String,
//     reporter: String,
//     assignee: String
// });
mongoose = require('mongoose');

module.exports = mongoose.model('Story', {
    title: String,
    description: String,
    criteria: String,
    status: String,
    type: String,
    reporter: String,
    assignee: String
});