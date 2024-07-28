import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { selectTasks, selectTasksLoading, selectTasksError } from '../features/tasksSlice'

export const useTasks = () => {
    const tasks = useSelector((state: RootState) => selectTasks(state))
    const loading = useSelector((state: RootState) => selectTasksLoading(state))
    const error = useSelector((state: RootState) => selectTasksError(state))
    return { tasks, loading, error }
}
