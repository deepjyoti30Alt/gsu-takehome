import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { selectTasks, selectTasksLoading, selectTasksError, addTaskOptimistic, addTask as addTaskAction, removeTaskOptimistic, } from '../features/tasksSlice'
import { BaseTask, BaseTaskWithId } from '@/app/types/task'
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

    return { tasks, loading, error, addTask }
}
