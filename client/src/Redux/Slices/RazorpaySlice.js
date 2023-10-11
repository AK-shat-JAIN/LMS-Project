import { createAsyncThunk } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"
import toast from "react-hot-toast"

const initialState={
    key: "",
    subscription_id: "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonth: {},
    monthlySalesRecord: []   
}

export const getRazorPayId = createAsyncThunk("/razorpay/getId", async ()=>{
    try {
        const response = await axiosInstance.get("/payment/razorpay-key")
        return response.data
    } catch (error) {
        toast.error(error?.message)
    }
})

export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse", async ()=>{
    try {
        const response = await axiosInstance.post("/payment/subscribe")
        return response.data
    } catch (error) {
        toast.error(error?.message)
    }
})

export const verifyUserPayment = createAsyncThunk("/payment/verify", async (data)=>{
    try {
        const response = await axiosInstance.post("/payment/verify", {
            razorpay_payment_id: data.razorpay_payment_id, 
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature
        })
        return response.data
    } catch (error) {
        toast.error(error?.message)
    }
})

export const getPlans = createAsyncThunk("/payment/plans", async ()=>{
    try {
        const response = axiosInstance.get("/payment/plans");
        toast.promise(response, {
            loading: "Fetching plans...",
            success: (data) => data?.data?.message || "Plans fetched successfully",
            error: "Failed to fetch plans"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.message)
    }
})

export const getPaymentRecords = createAsyncThunk("/payment/record", async ()=>{
    try {
        const response = axiosInstance.get("/payment/?count=100");
        toast.promise(response, {
            loading: "Fetching payment records...",
            success: (data) => data?.data?.message || "Payment records fetched successfully",
            error: "Failed to fetch payment records"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.message)
    }
})

export const cancelCourseBundle = createAsyncThunk("/payment/cancel", async ()=>{
    try {
        const response = axiosInstance.post("/payment/unsubscribe");
        toast.promise(response, {
            loading: "Cancelling subscription...",
            success: (data) => data?.data?.message || "Subscription cancelled successfully",
            error: "Failed to cancel subscription"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const RazorpaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(getRazorPayId.fulfilled, (state, action)=>{
            state.key = action?.payload?.key
        })
        .addCase(purchaseCourseBundle.fulfilled, (state, action)=>{
            state.subscription_id = action?.payload?.subscription_id
        })
        .addCase(verifyUserPayment.fulfilled, (state, action)=>{
            toast.success(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.success
        })
        .addCase(verifyUserPayment.rejected, (state, action)=>{
            toast.error(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.success
        })
        .addCase(getPaymentRecords.fulfilled, (state, action)=>{
            state.allPayments = action?.payload?.allPayments
            state.finalMonth = action?.payload?.finalMonth
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord
        })
    }
})

export default RazorpaySlice.reducer;