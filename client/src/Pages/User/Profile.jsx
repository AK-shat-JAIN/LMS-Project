import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";
import { getUserData } from "../../Redux/Slices/AuthSlice";


function Profile(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userData = useSelector((state) => state?.auth?.data);

    async function handleCancelSubscription(){
        await dispatch(cancelCourseBundle())
        await dispatch(getUserData())
        navigate("/")
    }

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <div className="my-10 flex flex-col gap-3 sm:gap-5 rounded-lg px-4 py-5 text-white w-[85%] sm:w-96 shadow-[0_0_10px_black]">
                    <img className=" w-32 h-32 sm:w-40 sm:h-40 m-auto rounded-full border border-white" src={userData.avatar.secure_id} alt="User_Image" />
                    <h3 className="text-2xl text-yellow-500 font-semibold text-center capitalize">
                        {userData.fullName}
                    </h3>
                    <div className="grid grid-cols-2">
                        <div>
                            <p>Email: </p>
                            <p>Role: </p>
                            <p>Subscription: </p>
                        </div>
                        <div>
                            <p>{userData?.email}</p>
                            <p>{userData?.role}</p>
                            <p>{userData?.subscription?.status==="active" ? "Active" : "Inactive"}</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
                        <Link to="/changepassword" className="w-full sm:w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                            <button>Change Password</button>
                        </Link>
                        <Link to="/user/editprofile" className="w-full sm:w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                            <button>Edit Profile</button>
                        </Link>
                    </div>
                    {(userData?.subscription?.status==="active") && (
                        <button onClick={() => handleCancelSubscription()} className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                            Cancel Subscription
                        </button>
                    )}
                </div>
            </div>
        </HomeLayout>
    ) 

}

export default Profile;