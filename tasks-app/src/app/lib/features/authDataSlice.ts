import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface AuthData {
    userId: string | null
    password: string | null
}

const loadFromLocalStorage = (): AuthData => {
    try {
        const serializedState = localStorage.getItem('authData')
        if (serializedState === null) {
            return { userId: null, password: null }
        }
        return JSON.parse(serializedState)
    } catch (e) {
        console.error('Could not load from localStorage', e)
        return { userId: null, password: null }
    }
}

const saveToLocalStorage = (state: AuthData) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('authData', serializedState)
    } catch (e) {
        console.error('Could not save to localStorage', e)
    }
}

const initialState: AuthData = loadFromLocalStorage()

export const authDataSlice = createSlice({
    name: 'authentication-data',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthData>) => {
            state.userId = action.payload.userId
            state.password = action.payload.password
            saveToLocalStorage(state)  // Save to localStorage
        },
        clearCredentials: (state) => {
            state.userId = null
            state.password = null
            saveToLocalStorage(state)  // Save to localStorage
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
