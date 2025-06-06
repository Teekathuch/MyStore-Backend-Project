const User = require('../Models/user')


const sendTokenResponse = (user , statusCode , res) => {
    const token = user.getSignedjwtToken();

    const options = {
        expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly : true
    };

    if(process.env.NODE_ENV === 'production'){
        options.secure = true;
    }
    res.status(statusCode).cookie('token',token,options).json({
        success : true,
        token
    });
}

const register = async (req,res,next) => {
    try {
        const {name,email,password,role} = req.body;

        const user = await User.create({
            name,
            email,
            password,
            role
        })


        sendTokenResponse(user,200,res);


    } catch (error) {
        res.status(400).json({
            success : false,
        })
    }
}

const login = async (req,res,next) => {
    try {
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : 'Please provide an email and password',
            })
        }

        const user = await User.findOne({email}).select('+password');

        if(!user){
            return res.status(400).json({success : false,msg : "Invalid credentials"});
        }
    
        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(401).json({success:false , msg : "Invalid credentials"});
        }
    

        sendTokenResponse(user,200,res);

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success : false,
        })
    }
}


const getMe = async (req,res,next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success : true,
        data : user
    });
};

const logout = async (req,res,next) => {
    res.cookie('token','none',{
        expires : new Date(Date.now()+10*1000),
        httpOnly : true
    }) ;

    res.status(200).json({
        success : true,
        data : {}
    });
}

module.exports = {register , login , logout , getMe}