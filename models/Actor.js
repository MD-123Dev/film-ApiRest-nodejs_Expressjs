const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actorSchema = new Schema({
   fistname: {
        type: String,
        require: true
      
    },
    lastname: {
        type: String,
        require: true
      
    },
    nationality: {
        type: String,
        require: true
      
    }
    
    
}, {timestamps: true});

module.exports = mongoose.model('Actor', actorSchema);