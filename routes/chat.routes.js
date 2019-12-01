module.exports = function(app){
    var chatController = require('./../controllers/chat.controllers')
    app.get('/', chatController.index);


}