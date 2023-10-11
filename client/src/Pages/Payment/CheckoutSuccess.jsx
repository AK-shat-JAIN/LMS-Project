import { AiFillCheckCircle } from "react-icons/ai";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "../../Redux/Slices/AuthSlice";


function CheckoutSuccess() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserData())
    })

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center text-white">
                <div className="relative w-[90%] sm:w-96 h-[26rem] flex flex-col items-center justify-center shadow-[0_0_10px_black] rounded-lg">
                    <h1 className="absolute top-0 w-full py-4 bg-green-500 text-2xl text-center font-bold rounded-tl-lg rounded-tr-lg">
                        Payment Successfull
                    </h1>
                    <div className="px-4 flex flex-col items-center justify-center space-y-2">
                        <div className="text-center space-y-2">
                            <h1 className="text-2xl font-semibold">
                                Welcome to the PRO Bundle
                            </h1>
                            <p className="">
                                Now, you can enjoy all the courses available on our platform.
                            </p>
                        </div>
                        <AiFillCheckCircle className="text-green-500 text-5xl" />
                    </div>
                    <Link to="/" className="absolute bottom-0 w-full py-2 text-xl font-semibold text-center rounded-br-lg rounded-bl-lg bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300">
                        <button>Go To Dashboard</button>
                    </Link>
                </div>
            </div>
        </HomeLayout>
    )
}

export default CheckoutSuccess;