import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface AuthData {
    userId: string | null
    password: string | null
}

const initialState: AuthData = {
    userId: null,
    password: null,
}

export const authDataSlice = createSlice({
    name: 'authentication-data',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthData>) => {
            state.userId = action.payload.userId
            state.password = action.payload.password
        },
        clearCredentials: (state) => {
            state.userId = null
            state.password = null
        },
    },
})

export const { setCredentials, clearCredentials } = authDataSlice.actions

// Define Selectors
export const selectIsLoggedIn = (state: RootState) =>
    state.authData.userId !== null && state.authData.password !== null

export const selectBasicAuthCredentials = (state: RootState) => {
    if (state.authData.userId && state.authData.password) {
        return btoa(`${state.authData.userId}:${state.authData.password}`)
    }
    return null
}

export default authDataSlice.reducer