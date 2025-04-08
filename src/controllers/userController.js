import userService from "../services/userService.js";

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await userService.getAllUsers();
        return res.status(200).json(allUsers);
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: error.message,
        })
    }
};

const findUserByEmail = async (req, res) => {
    try {
        const user = await userService.findOne({ email: req.params.email });
        return res.status(200).json(
            {
                statusCode: 200,
                data: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    gender: user.gender,
                    age: user.age,
                    address: user.address,
                }
            }
        );
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: error.message,
        })
    }
}

const createUser = async (req, res) => {
    let userDb = await userService.fetchUserByEmail(req.body.email);
    if (userDb) {
        return res.status(409).json({
            statusCode: 409,
            message: "Email already exists"
        })
    }
    try {
        const user = await userService.createUser(req.body);
        return res.status(201).json({
            statusCode: 201,
            message: "Created user",
            data: {
                name: user.name,
                email: user.email,
                gender: user.gender,
                age: user.age,
                address: user.address
            }
        });
    }catch(error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}
export default {getAllUsers, createUser};