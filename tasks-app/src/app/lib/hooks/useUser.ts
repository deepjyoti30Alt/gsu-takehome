import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { selectUser, selectUserError, selectUserLoading } from '../features/userSlice'

export const useUser = () => {
    const user = useSelector((state: RootState) => selectUser(state))
    const loading = useSelector((state: RootState) => selectUserLoading(state))
    const error = useSelector((state: RootState) => selectUserError(state))
    return { user, loading, error }
}
