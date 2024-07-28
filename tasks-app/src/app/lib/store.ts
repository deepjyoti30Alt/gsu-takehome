import { configureStore } from '@reduxjs/toolkit'
import authDataReducer from './features/authDataSlice'
import tasksReducer from './features/tasksSlice'
import userReducer from './features/userSlice'


export const makeStore = () => {
    return configureStore({
        reducer: {
            authData: authDataReducer,
            tasks: tasksReducer,
            user: userReducer,
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
