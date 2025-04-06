import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
})

export default mongoose.model('User', UserSchema);