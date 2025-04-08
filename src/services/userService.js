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

const deleteUser = async (id) =>{
    const user = await User.findById(id);
    if(!user){
        throw new Error("User does not exist");
    }
    await User.findByIdAndDelete(id);
}

const updateUser = async (id, userData) =>{
    const user = await User.findById(id);
    if(!user){
        throw new Error("User does not exist");
    }
    if (userData.password){
        const hashed = await bcrypt.hash(userData.password, 10);
        userData.password = hashed
    }
    Object.assign(user, userData);
    await user.save();
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        gender: user.gender,
        age: user.age,
        address: user.address
    };
}

export default {getAllUsers, createUser, fetchUserByEmail, deleteUser, updateUser};