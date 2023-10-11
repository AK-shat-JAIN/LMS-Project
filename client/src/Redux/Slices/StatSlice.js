import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    allUsersCount: 0,
    subscribedUsersCount: 0,
};

export const getStatsData = createAsyncThunk("stats/get", async () => {
    try {
        const response = axiosInstance.get("/admin/stats/users");
        toast.promise(response, {
            loading: "Loading...",
            success: (data) => data?.data?.message || "Successfully loaded!",
            error: "Failed to load!",
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load!");
    }
});

const StatSlice = createSlice({
    name: "stat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStatsData.fulfilled, (state, action) => {
            state.allUsersCount = action?.payload?.allUsersCount;
            state.subscribedUsersCount = action?.payload?.subscribedUsersCount;
        });
    }
});

export default StatSlice.reducer;