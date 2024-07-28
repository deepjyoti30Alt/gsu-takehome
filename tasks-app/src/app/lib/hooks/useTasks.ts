import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { selectTasks, selectTasksLoading, selectTasksError, addTaskOptimistic, addTask as addTaskAction, updateTask as updateTaskAction, removeTaskOptimistic, updateTaskOptimistic, } from '../features/tasksSlice'
import { BaseTask, BaseTaskWithId, Task } from '@/app/types/task'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch } from '../hooks'
import { TaskCreateError } from '../errors/TaskError'

export const useTasks = () => {
    const dispatch = useAppDispatch()
    const tasks = useSelector((state: RootState) => selectTasks(state))
    const loading = useSelector((state: RootState) => selectTasksLoading(state))
    const error = useSelector((state: RootState) => selectTasksError(state))

    const addTask = async (task: BaseTask, authToken: string) => {
        const temporaryId = uuidv4()
        const optimisticTask: BaseTaskWithId = { ...task, task_id: temporaryId }

        // Add the task optimistically
        dispatch(addTaskOptimistic(optimisticTask))

        try {
            await dispatch(addTaskAction({ task: optimisticTask, authToken })).unwrap()
        } catch (err) {
            // Remove the task if the API call fails
            dispatch(removeTaskOptimistic(temporaryId))
            throw TaskCreateError;
        }
    }

    const updateTask = async (task: BaseTask, authToken: string, originalTask: Task) => {
        const optimisticTask: Task = { ...originalTask, ...task }

        // Add the task optimistically
        dispatch(updateTaskOptimistic(optimisticTask))

        try {
            await dispatch(updateTaskAction({ task: optimisticTask, authToken, originalTask })).unwrap()
        } catch (err) {
            // Remove the task if the API call fails
            dispatch(updateTaskOptimistic(originalTask))
            throw TaskCreateError;
        }
    }

    return { tasks, loading, error, addTask, updateTask }
}
