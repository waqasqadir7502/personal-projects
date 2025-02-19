import express from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import { UserModel } from "../model/User.js";

const router = express.Router();


//Sign Up Process
router.post("/signup",  async (req, res)=>{
    const {username , email, password} = req.body;

    const user = await UserModel.findOne({username : username, email : email, password : password});

    if(user){
      return  res.json({message : "User Already Exists!"})
    }

    const hashedPass = await bcrypt.hash(password , 10);
    const newUser = new UserModel({username, email, password : hashedPass});
    await newUser.save();

    res.json({message : "User Register Successfully!"});
} )

//SignIn Process
router.post("/signin",async (req ,res)=>{
    const {username , password} = req.body;
    const user = await UserModel.findOne({username : username});

    if(!user){
        return res.json({message : "User Doesn't Exist!"})
    }

    const isPassValid = await bcrypt.compare(password , user.password)
    if(!isPassValid){
    return res.json({message : "Username or Password is Incorrect!"})
    }

    const token = jwt.sign({id : user._id}, "secret")
    res.json({token , UserID : user._id})
})


export {router as userRouter};

export const verifyToken = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        jwt.verify( authHeader, "secret" , (err) =>{
            if(err){
                return res.sendStatus(403)
            }
            next();
        })
    }else{
        res.sendStatus(401)
    }
}