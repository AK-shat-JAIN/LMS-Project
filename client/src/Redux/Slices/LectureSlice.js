import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState={
    lectures: [],
}

export const getCourseLecture = createAsyncThunk("/course/lecture/get", async (courseId) => {
    try {
        const res = axiosInstance.get(`course/${courseId}`);
        toast.promise(res, {
            loading: "Fetching Course Lectures...",
            success: "Lectures Fetched Successfully",
            error: "Failed to fetch Lectures"
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const addCourseLecture = createAsyncThunk("/course/lecture/add", async (data) => {
    try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("lecture", data.lecture);

        const res = axiosInstance.post(`/course/${data.id}`, formData);
        toast.promise(res, {
            loading: "Adding Course Lecture...",
            success: "Lecture Added Successfully",
            error: "Failed to add Lecture"
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const deleteCourseLecture = createAsyncThunk("/course/lecture/delete", async (data) => {
    try {
        const res = axiosInstance.delete(`/course/${data.id}/${data.lectureId}`);
        toast.promise(res, {
            loading: "Deleting Course Lecture...",
            success: "Lecture Deleted Successfully",
            error: "Failed to delete Lecture"
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const LectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getCourseLecture.fulfilled, (state, action) => {
            state.lectures = action?.payload?.lectures;
        })
        .addCase(addCourseLecture.fulfilled, (state, action) => {
            state.lectures = action?.payload?.course?.lectures;
        })
    },
});

export default LectureSlice.reducer;