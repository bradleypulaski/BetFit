var crypto = require("crypto");
var props = require("../.././properties.js");


var sha512 = function(password){
    var hash = crypto.createHmac('sha512', props.salt); 
    hash.update(password);
    var value = hash.digest('hex');
    return value;
};

module.exports = sha512;