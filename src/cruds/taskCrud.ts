import { User, Task, IUser } from '../models/userSchema';


//Create new task
export const createTask = async (taskData: { title: string, description: string, status?: string, assignedTo?: string }) => {

    const finishedBy = taskData.status === 'completed' ? Date.now() : null;

    const newTask = new Task({
        title: taskData.title,
        description: taskData.description,
        status: taskData.status || 'to-do',
        assignedTo: taskData.assignedTo || null,
        createdAt: Date.now(),
        finishedBy: finishedBy
    });

    await newTask.save();
    return newTask;
};

//Get all tasks
export const getAllTasks = async () => {
    return await Task.find().populate('assignedTo', 'username email');
};

//Get a task by ID
export const getTaskById = async (taskId: string) => {
    const task = await Task.findById(taskId).populate('assignedTo', 'username email');
    if (!task) {
        throw new Error('Task not found');
    }
    return task;
}

//Update task
export const updateTask = async (taskId: string, updatedTaskData: Partial<{ title: string; description: string; status: string; assignedTo?: string | null }>) => {
    const task = await Task.findById(taskId);
    if (!task) {
        throw new Error('Task not found');
    }

    Object.assign(task, updatedTaskData);

    if (updatedTaskData.status) {
        task.finishedBy = updatedTaskData.status === 'completed' ? new Date() : null;
    }

    await task.save();
    return task;
};


//Delete a task
export const deleteTask = async (taskId: string) => {
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
        throw new Error('Task not found');
    }

    return task;
}