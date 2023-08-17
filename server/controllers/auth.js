const User = require('../models/user')
const jwt = require('jsonwebtoken')

//sendgrid api
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)



// exports.signup = async (req, res) => {

    
//     const {name, email, password} = req.body

//     const userExists = await User.findOne({email}).exec()
    

//     if (userExists){
        
//       return res.status(400).json({
//         error: 'Email already exists, try login instead.'
//       })
//     }

//     let newUser = new User({name, email, password})

//     newUser.save()
//     .then(() => {
//         return res.status(200).json({
//         message: 'Singup success! Please Sign in.'
//         })
//     })
//     .catch((err) => {
//         console.log('SIGNUP ERROR', err)
        
//     })

    
   
      
// }



// email confirmatation signup



exports.signup = async (req, res) => {
    const {name, email, password} = req.body

    const userExists = await User.findOne({email}).exec()
    

    if (userExists){
        
      return res.status(400).json({
        error: 'Email already exists, try login instead.'
      })
    }

    const token = jwt.sign({name, email, password}, process.env.JWT_ACCOUNT_ACTIVATION, {expiresIn: '10min'})
    
    const emailData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'MernAuth activation link',
        html: `
        <h3>Plese use the following link to activate your account</h3>
        <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
        <hr />
        <p>This email may containt sensitive info.</p>
        <p>${process.env.CLIENT_URL}</p>`

    }

    sgMail
    .send(emailData)
    .then(sent => {
        // console.log('SINGUP MAIL SENT', sent)
        res.status(200).json({
            message: `Email has been sent to ${email}`
        });
        
    })
    .catch((err)=>{
        return res.json({
            message: err.message
        })
    })

}



// activation link controller
exports.accountActivation = (req, res) => {
    const {token} = req.body

    if(token){
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded){
            if (err){
                console.log('JWT ACCOUNT VERIFACTION ERROR', err)
                return res.status(401).json({
                    error: 'Expired or Invalid link. Please Signup again'
                })
            }
        })

        const {name, email, password} = jwt.decode(token);

        let newUser = new User({name, email, password})

        newUser.save()
        .then(() => {
            return res.status(200).json({
            message: 'Singup success! Please Sign in.'
            })
        })
        .catch((err) => {
            console.log('SIGNUP ERROR', err)
            
        })
    } else {
        return json.response({
            message: 'something went wrong! Please try again.'
        })
    }

    
}




// signin controller

exports.signin = (req, res) => {
    const {email, password} = req.body;

    //check if user exists

User.findOne({email}).then((user) => {

    if (!user){
        return res.status(400).json({
            error: "Account with this email doesn't exist"
        })
    }
    
    if(!user.authenticate(password)){
        return res.status(400).json({
            error: 'Email and password do no match'
        })
    }

    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
    const {_id, name, email, role} = user;

    return res.json({
        token,
        user: {_id, name, email, role}
    })


})
.catch(() => {
    if (err){
        return res.status(400).json({
            error: 'There was some error. Please try again'
        })
    }
})
    
}

