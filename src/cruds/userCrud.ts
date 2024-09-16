import { User, IUser } from '../models/userSchema';
import bcrypt from 'bcryptjs';


// Create and save a new user
export const createUser = async (userData: { username: string; email: string, password: string }): Promise<IUser> => {
    const newUser = new User(userData);
    return await newUser.save();
};

// Get all users
export const getAllUsers = async () => {
    return await User.find({}, '-password');
};

//Get user by id
export const getUserById = async (id: string): Promise<IUser | null> => {
    return await User.findById(id, '-password');
};

//login user
export const loginUser = async (email: string, enteredPassword: string): Promise<IUser | null> => {
    const user = await User.findOne({ email });
    if (!user) {
        return null;
    }

    const isMatch = await bcrypt.compare(enteredPassword, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    return user;
};

//update user 
export const updateUser = async (userId: string, updatedUserData: Partial<{ username: string; email: string; password: string }>) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    };

    Object.assign(user, updatedUserData);

    if (updatedUserData.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(updatedUserData.password, salt);
    }

    await user.save();
    return user;
}

// Delete a user by ID
export const deleteUserById = async (id: string) => {
    return await User.findByIdAndDelete(id);
};
