import { User } from '../models/userSchema';


// Create and save a new user
export const createUser = async (userData: { username: string; email: string }) => {
    const newUser = new User(userData);
    return await newUser.save();
};

// Get all users
export const getAllUsers = async () => {
    return await User.find();
};

// Delete a user by ID
export const deleteUserById = async (id: string) => {
    return await User.findByIdAndDelete(id);
};
