import { prisma } from '../config/db.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';
import e from 'express';

const register = async(req,res) => {
    const { name, email, password } = req.body;

    //check if user already exists in the database
    const existingUser = await prisma.user.findUnique({
        where: { email: email }
    });
   
    if(existingUser){
        return  res.status(400).json({ message: "User already exists" });
    }

    //Hash the password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //Create a new user
    const user = await prisma.user.create({
        data:{
            name,
            email,
            password: hashedPassword
        }
    })
    //Generate JWT token
    const token = generateToken(user.id, res);


    res.status(201).json({
        status: "success",
         message: "User registered successfully", 
         data: {
            user,
            token
         }
        });
}

const login = async(req,res) => {
    const { email, password } = req.body;

    //check if user exists in the table
    const user = await prisma.user.findUnique({
        where: { email: email }
    });
   
    if(!user){
        return  res.status(401).json({ message: "Invalid email or password" });
    }

    //verfiy password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(401).json({ message: "Invalid email or password" });
    }

    //Generate JWT token
    const token = generateToken(user.id, res);

    await prisma.log.create({
    data: {
      action: 'USER_LOGIN',
      userId: user.id
    }
  });

    res.status(200).json({ 
        message: "Login successful",
         data: 
         {
            user: 
            {
                name: user.name,
                 email: user.email
            },
            token,
        }
        });
}


const logout = (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expiry: new Date(0)
    });

    res.status(200).json({ 
        status: "success",
        message: "Logout successful" });
}


export { register, login, logout };