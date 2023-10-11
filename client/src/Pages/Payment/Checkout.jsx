import { useEffect } from "react";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice";
import toast from "react-hot-toast";
import HomeLayout from "../../Layouts/HomeLayout";


function Checkout(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const razorpayKey = useSelector((state) => state?.razorpay?.key)
    const subscription_id = useSelector((state) => state?.razorpay?.subscription_id)
    const userData = useSelector((state) => state?.auth?.data)
    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: ""
    }

    async function handleSubscription(e){
        e.preventDefault();                       // Prevents the page from reloading on form submission

        if(!razorpayKey || !subscription_id){
            toast.error("Something went wrong. Please try again later.")
            return;
        }

        const options = {
            key: razorpayKey, // Enter the Key ID generated from the Dashboard
            subscription_id: subscription_id, // Enter the Subscription ID generated from the Dashboard
            name: "Cousify Pvt. Ltd.",
            description: "Subscription",
            theme: {
                color: "#F37254"
            },
            prefill: {
                name: userData?.fullName,
                email: userData?.email,
            },
            handler: async function (response){
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id
                paymentDetails.razorpay_signature = response.razorpay_signature

                toast.success("Payment Successful. Redirecting to Dashboard...")
                const res = await dispatch(verifyUserPayment(paymentDetails))
                res?.payload?.success ? navigate('/checkout/success') : navigate('/checkout/failure')
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    async function load(){
        await dispatch(getRazorPayId())
        await dispatch(purchaseCourseBundle())
    }

    useEffect(()=>{
        load();
    }, [])

    return (
        <HomeLayout>
            <form 
                className="min-h-[90vh] sm:pt-12 sm:px-20 flex flex-col justify-center items-center text-white"
                onSubmit={handleSubscription}
            >
                <div className="relative w-[90%] left-0 sm:w-96 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg ">
                    <h1 className="absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg bg-yellow-500">Subscription Bundle</h1>
                    <div className="px-4 space-y-4 text-center">
                        <p className="text-[17px]">
                            This purchase will give you access to all the courses available on our platform.<br />
                            <span className="text-yellow-500 font-bold">
                                All the existing and upcoming courses will be available to you.    
                            </span> 
                        </p>
                        <p className="flex justify-center items-center gap-1 text-2xl font-bold text-yellow-500">
                            <BiRupee /><span>499</span> only
                        </p>
                        <div className="text-gray-200">
                            <p>100% refund on cancecellation</p>
                            <p>*Terms and Conditions applied</p>
                        </div>
                        <button type="submit" className="absolute bottom-0 left-0 w-full text-xl font-bold rounded-bl-lg rounded-br-lg py-2 bg-yellow-500 hover:bg-yelllow-600 transition-all ease-in-out duration-300">
                            Buy Now
                        </button>
                    </div>
                </div>
            </form>
        </HomeLayout>
    )

}

export default Checkout;