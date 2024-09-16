import mongoose, { CallbackError } from 'mongoose';
import bcrypt from 'bcryptjs';
import { Call } from '@prisma/client/runtime/library';
import { create } from 'domain';

// Task Schema
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true, enum: ['to-do', 'in progress', 'blocked', 'completed'], default: 'to-do' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    createdAt: { type: Date, default: Date.now },
    finishedBy: { type: Date },
});

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    tasks: typeof taskSchema[];
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [taskSchema]
});


userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    try {
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        next(error as CallbackError);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
}



const User = mongoose.model<IUser>('User', userSchema);
const Task = mongoose.model('Task', taskSchema);

export { User, Task, IUser };
