import { UserSessionDetails } from "@/app/types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from '../store'
import { getUserDetails } from "@/app/networking/user";

export interface UserDetails {
    user: UserSessionDetails
    loading: boolean
    error: string | null
}

const initialState: UserDetails = {
    user: {
        id: '',
        email: '',
        first_name: '',
        last_name: '',
        createdAt: new Date()
    },
    loading: false,
    error: null
};

// Async thunk to fetch user details
export const fetchUser = createAsyncThunk('users/me', async (authToken: string) => {
    const tasks = await getUserDetails(authToken)
    return tasks;
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to fetch user'
            })
    },
})

export const selectUser = (state: RootState) => state.user.user
export const selectUserLoading = (state: RootState) => state.user.loading
export const selectUserError = (state: RootState) => state.user.error

export default userSlice.reducer
