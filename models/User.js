const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crypto = require('crypto');
const { v1: uuid } = require('uuid');

const userSchema = new Schema({
   name: {
        type: String,
        require: true
      
    },
     email: {
        type: String,
        require: true,
        unique:true
      
    },
     hashed_password: {
        type: String,
        require: true
      
    },
    salt: {
        type: String
    },
     role: {
        type: String,
        default:0
      
    }
    
    
}, {timestamps: true});

userSchema.virtual('password')
.set(function(password){
    this._password = password;
    this.salt = uuid();
    this.hashed_password = this.cryptPassword(password)
})
.get(function() {
    return this._password;
})

userSchema.methods = {
    //**check password is match  */
    authenticate: function(plainText) {
        return this.cryptPassword(plainText) === this.hashed_password;
    },
    cryptPassword: function(password) {
        if(!password) return '';

        try {
            
            return crypto
            .createHmac('sha1', this.salt )
            .update(password)
            .digest('hex');
            
        } catch (error) {
            return ''
        }
    }
}

module.exports = mongoose.model('User', userSchema);