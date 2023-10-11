import { RxCrossCircled } from "react-icons/rx";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";


function CheckoutFailure() {
    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center text-white">
                <div className="relative w-[90%] sm:w-96 h-[26rem] flex flex-col items-center justify-center shadow-[0_0_10px_black] rounded-lg">
                    <h1 className="absolute top-0 w-full py-4 bg-red-500 text-2xl text-center font-bold rounded-tl-lg rounded-tr-lg">
                        Payment Failed
                    </h1>
                    <div className="px-4 flex flex-col items-center justify-center space-y-2">
                        <div className="text-center space-y-2">
                            <h1 className="text-2xl font-semibold">
                                Oops!! your payment failed.
                            </h1>
                            <p className="">
                                Please try again later.
                            </p>
                        </div>
                        <RxCrossCircled className="text-red-500 text-5xl" />
                    </div>
                    <Link to="/checkout" className="absolute bottom-0 w-full py-2 text-xl font-semibold text-center rounded-br-lg rounded-bl-lg bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300">
                        <button>Try Again</button>
                    </Link>
                </div>
            </div>
        </HomeLayout>
    )
}

export default CheckoutFailure;