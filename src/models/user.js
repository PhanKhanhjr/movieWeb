import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    refreshToken: {
        type: String,
        default: null,
    }
});

export default mongoose.model('User', userSchema);
