const User = require('../models/User');
const jwt = require('jsonwebtoken');

//**register */
exports.signup = (req, res) => {
   const user = new User(req.body); 

    user.save((err, user) => {
         
        if(err) {
            return res.status(400).json({
                error: 'bad Request !'
            })
        }

        res.json({
            user: user
        })
    })
     
}

exports.signin = (req, res) => {

    const { email, password } = req.body;

    User.findOne({email}, (err, user) => {
        
        if(err || !user) {
            return res.status(400).json({
                error: 'User not found with this email, Please SignUp!'
            })
        }

        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and Password dont Match !'
            })
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

        res.cookie('token', token, {expire: new Date() + 8062000})

        const { _id, name, email } = user;

        return res.json({
            token, user: {_id, name, email}
        })

    })

}

exports.signout = (req, res) => {

    res.clearCookie('token');

    res.json({
        message: "User Signout"
    })

}