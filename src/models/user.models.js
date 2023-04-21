import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

export const UserModel = mongoose.model("users",userSchema);