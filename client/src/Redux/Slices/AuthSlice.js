import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data')!=undefined ? JSON.parse(localStorage.getItem('data')) : {},       // JSON.parse() converts string to object
}

export const createAccount = createAsyncThunk("auth/signup", async (data) => {
    try {
        let res = axiosInstance.post("user/register", data); 
        toast.promise(res, {
            loading: 'Creating account...',
            success: (data) => data?.data?.message || 'Account created successfully',
            error: 'Failed to create Account',
        })

        res = await res;
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const logIn = createAsyncThunk("auth/login", async (data) => {
    try {
        let res = axiosInstance.post("user/login", data); 
        toast.promise(res, {
            loading: 'Wait! Logging you in...',
            success: (data) => data?.data?.message || 'Logged in successfully',
            error: 'Failed to Login',
        })

        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const logOut = createAsyncThunk("auth/logout", async () => {
    try {
        const res = axiosInstance.get("user/logout");
        toast.promise(res, {
            loading: 'Wait! Logging you out...',
            success: (data) => data?.data?.message || 'Logged out successfully',
            error: 'Failed to Logout',
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const updateProfile = createAsyncThunk("user/update", async (data) => {
    try {
        const res = axiosInstance.put(`user/update/${data[0]}`, data[1]);
        toast.promise(res, {
            loading: 'Updating profile...',
            success: (data) => data?.data?.message || 'Profile updated successfully',
            error: 'Failed to update profile',
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const getUserData = createAsyncThunk("user/details", async () => {
    try {
        const res = axiosInstance.get("user/me");

        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const changePassword = createAsyncThunk("user/changePassword", async (data) => {
    try {
        const res = axiosInstance.post("user/change-password", data);
        toast.promise(res, {
            loading: 'Changing password...',
            success: (data) => data?.data?.message || 'Password changed successfully',
            error: 'Failed to change password',
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // [createAccount.fulfilled]: (state, action) => {
            //     localStorage.setItem('isLoggedIn', true);
        //     localStorage.setItem('role', action.payload.role);
        //     localStorage.setItem('data', JSON.stringify(action.payload.data));
        //     state.isLoggedIn = true;
        //     state.role = action.payload.role;
        //     state.data = action.payload.data;
        // },
        // [logIn.fulfilled]: (state, action) => {
        //     localStorage.setItem('isLoggedIn', true);
        //     localStorage.setItem('role', action.payload.role);
        //     localStorage.setItem('data', JSON.stringify(action.payload.data));
        //     state.isLoggedIn = true;
        //     state.role = action.payload.role;
        //     state.data = action.payload.data;
        // },
        //                  OR
        builder
        .addCase(logIn.fulfilled, (state, action)=>{
            // console.log(action)
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('role', action?.payload?.user?.role);
            localStorage.setItem('data', JSON.stringify(action?.payload?.user));
            state.isLoggedIn = true;
            state.role = action?.payload?.user?.role;
            state.data = action?.payload?.user;
        }) 
        .addCase(logOut.fulfilled, (state)=>{
            // localStorage.removeItem('isLoggedIn');
            // localStorage.removeItem('role');
            // localStorage.removeItem('data');
            localStorage.clear();
            state.isLoggedIn = false;
            state.role = "";
            state.data = {};
        })
        .addCase(getUserData.fulfilled, (state, action)=>{
            localStorage.setItem('data', JSON.stringify(action?.payload?.user));
            state.data = action.payload.user;
        })
    }
})

export const {} = AuthSlice.actions;
export default AuthSlice.reducer;