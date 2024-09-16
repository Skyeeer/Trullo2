import { Router, Request, Response } from 'express';
import { createUser, getAllUsers, deleteUserById, getUserById, loginUser, updateUser } from '../cruds/userCrud';
import { createTask, updateTask, getAllTasks, deleteTask } from '../cruds/taskCrud';

const router = Router();

// 1. Create a new user
router.post('/users/register', async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        const newUser = await createUser({ username, email, password });
        res.status(201).json({ message: 'User created successfully', newUser });
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ error: err.message });
    }
});

//Create a task
router.post('/tasks', async (req: Request, res: Response) => {
    try {
        const { title, description, status, assignedTo } = req.body;
        const newTask = await createTask({ title, description, status, assignedTo });
        res.status(201).json({ message: 'Task created successfully', newTask });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message })
    }
});

// 2. Get all users
router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
});

//Get all tasks
router.get('/tasks', async (req: Request, res: Response) => {
    try {
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
})

//Update User
router.put('/users/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { username, email, password } = req.body;

        const updatedUser = await updateUser(userId, { username, email, password });
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
})

//Update task
router.put('/tasks/:taskId', async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const { title, description, status, assignedTo } = req.body;

        const updatedTask = await updateTask(taskId, { title, description, status, assignedTo });
        res.status(200).json({ message: 'Task updated successfully', updatedTask });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
});

// 3. Delete a user by ID
router.delete('/users/:userId', async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;

        const deletedUser = await deleteUserById(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
});

//Delete a taks
router.delete('/tasks/:taskId', async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const deletedTask = await deleteTask(taskId);
        res.status(200).json({ message: 'Task deleted successfully', deletedTask });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
});

//Login user
router.post('/users/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await loginUser(email, password);
        res.status(200).json({ message: 'User logged in successfully', user });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unkown error' });
        }
    }
});

export default router;