const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models.User");

//SignUp endpoint Logic

exports.signup = async (req, res) => {
    const {email, password} = req.body;

    const exists = await User.findOne({email});
    if (exists) return res.status(400).json ({message:"User already exists"});

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({email, password: hashed});
     
    const token = jwt.sign({id: user._id, role: user.role}, process.JWT_SECRET,{
        expiresIn:'1h'
    });
    res.json(token);
};

//Login endpoint Logic
exports.login = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(400).json({message: "USer does not exist"});

    const match = await bcrypt.compare (password, user.password);
    if (!match) return res.status(401).json ({message: "Incorrect password"});

    const token = jwt.sign({id: user._id, role: user.role}, process.JWT_SECRET,{
        expiresIn:'1h'
    });
    res.json(token);
};