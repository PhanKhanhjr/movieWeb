import User from "../models/user.js";
import bcrypt from "bcryptjs";
import user from "../models/user.js";
const getAllUsers = async () =>{
    return await User.find();
};

const createUser = async (userData) =>{
    const password = userData.password;
    const hashed = await bcrypt.hash(userData.password, 10);
    userData.password = hashed
    const newUser = new User(userData);
    return await newUser.save();
}

const fetchUserByEmail = async (email) =>{
    try {
        const currentUser = await user.findOne({email})
        return currentUser;
    }
    catch(err){
        throw new Error('Database error while fetching user by email');
    }
}

const deleteUser = async (email) =>{
}

export default {getAllUsers, createUser, fetchUserByEmail};