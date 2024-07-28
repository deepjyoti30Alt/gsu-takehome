import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Task } from '@/app/types/task'
import { getTasks } from '@/app/networking/task'

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

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
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
    },
})

export const selectTasks = (state: RootState) => state.tasks.tasks
export const selectTasksLoading = (state: RootState) => state.tasks.loading
export const selectTasksError = (state: RootState) => state.tasks.error

export default tasksSlice.reducer
