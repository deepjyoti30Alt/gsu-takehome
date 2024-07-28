import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { BaseTaskWithId, Task } from '@/app/types/task'
import { createTask, getTasks, updateTask as updateTaskUpstream } from '@/app/networking/task'

interface TasksState {
    tasks: Task[]
    loading: boolean
    error: string | null
}

// Initial state
const initialState: TasksState = {
    tasks: [],
    loading: false,
    error: null,
}

// Async thunk to fetch tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (authToken: string) => {
    const tasks = await getTasks(authToken)
    return tasks;
})

export interface TaskPayload {
    originalTask?: Task,
    task: BaseTaskWithId,
    authToken: string
}

// Async thunk to add a task
export const addTask = createAsyncThunk<Task, TaskPayload>('tasks/addTask', async ({ task, authToken }, { rejectWithValue }) => {
    try {
        return await createTask(task, authToken);
    } catch (err: any) {
        return rejectWithValue(err.message)
    }
})

// Async thunk to update a task
export const updateTask = createAsyncThunk<void, TaskPayload>('tasks/updateTask', async ({ task, authToken }, { rejectWithValue }) => {
    try {
        await updateTaskUpstream(task, authToken, task.task_id);
    } catch (err: any) {
        return rejectWithValue(err.message)
    }
})

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTaskOptimistic: (state, action) => {
            state.tasks.push(action.payload)
        },
        removeTaskOptimistic: (state, action) => {
            state.tasks = state.tasks.filter(task => task.task_id !== action.payload)
        },
        updateTaskOptimistic: (state, action) => {
            const withoutTaskToUpdate = state.tasks.filter(task => task.task_id !== action.payload.task_id)
            state.tasks = [ ...withoutTaskToUpdate, action.payload ]
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false
                state.tasks = action.payload
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to fetch tasks'
            })
        
        builder
            .addCase(addTask.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.loading = false
                // Find and update the optimistically added task with the server response
                const index = state.tasks.findIndex(task => task.task_id === action.meta.arg.task.task_id)
                if (index !== -1) {
                    state.tasks[index] = action.payload
                }
            })
            .addCase(addTask.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
                // Rollback the optimistically added task
                state.tasks = state.tasks.filter(task => task.task_id !== action.meta.arg.task.task_id)
            })
        
        builder
            .addCase(updateTask.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                // Optimistically update the task
                const index = state.tasks.findIndex(t => t.task_id === action.meta.arg.task.task_id);
                if (index !== -1) {
                    state.tasks[index] = {
                        ...action.meta.arg.task,
                        createdAt: action.meta.arg.originalTask?.createdAt || new Date(),
                        updatedAt: action.meta.arg.originalTask?.updatedAt || new Date(),
                        is_due: action.meta.arg.originalTask?.is_due || false,
                    };
                }
            })
            .addCase(updateTask.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to update task';
            })
    },
})

export const { addTaskOptimistic, removeTaskOptimistic, updateTaskOptimistic } = tasksSlice.actions

export const selectTasks = (state: RootState) => state.tasks.tasks
export const selectTasksLoading = (state: RootState) => state.tasks.loading
export const selectTasksError = (state: RootState) => state.tasks.error

export default tasksSlice.reducer
