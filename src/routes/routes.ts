import { Router, Request, Response } from 'express';
import { createUser, getAllUsers, deleteUserById } from '../cruds/userCrud';

const router = Router();

// 1. Create a new user
router.post('/', async (req: Request, res: Response) => {
    try {
        const { username, email } = req.body;

        const newUser = await createUser({ username, email });
        res.status(201).json({ message: 'User created successfully', newUser });
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ error: err.message });
    }
});

// 2. Get all users
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
});

// 3. Delete a user by ID
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

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

export default router;