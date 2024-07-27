import { configureStore } from '@reduxjs/toolkit'
import authDataReducer from './features/authDataSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            authData: authDataReducer
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
