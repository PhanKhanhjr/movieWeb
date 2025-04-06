import User from "../model/User.js";

const getAllUsers = async () =>{
    return await User.find();
};

const createUser = async (userData) =>{
    const newUser = new User(userData);
    return await newUser.save();
}

const fetchUserByEmail = async (email) =>{
    try {
        const user = await User.findOne({email})
        return user;
    }
    catch(err){
        throw new Error('Database error while fetching user by email');
    }

}

export default {getAllUsers, createUser, fetchUserByEmail};