import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { isValidPassword } from "../../Helpers/regexMatcher";
import { useState } from "react";
import { changePassword } from "../../Redux/Slices/AuthSlice";

function ChangePassword(){

    const dispatch = useDispatch();
    const navigate =useNavigate();

    const [userPassword, setUserPassword] = useState({
        oldPassword: "",
        newPassword: "",
    });

    function handlePasswordChange(e){
        const { name, value } = e.target;
        setUserPassword({
            ...userPassword,
            [name]: value,
        });
    }

    async function handleFormSubmit(event){
        event.preventDefault();
        
        if(!userPassword.oldPassword || !userPassword.newPassword){
            toast.error("Please fill all the fields");
            return;
        }
        
        if(userPassword.oldPassword === userPassword.newPassword){
            toast.error("Old password and new password cannot be same");
            return;
        }

        if(!isValidPassword(userPassword.newPassword)){
            toast.error("Password should be 6 - 16 characters long and should contain atleast 1 number and 1 special character");
            return;
        }
        
        const response = await dispatch(changePassword(userPassword));
        if(response?.payload?.success){
            toast.success("Password changed successfully");
            navigate("/user/profile");
        }

        setUserPassword({
            oldPassword: "",
            newPassword: "",
        });
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <form
                    noValidate
                    onSubmit={handleFormSubmit}
                    className="flex flex-col justify-center gap-6 rounded-lg p-4 sm:p-6 text-white m-4 w-full sm:w-96 h-[26rem] shadow-[0_0_10px_black]"
                >
                    <h1 className="text-center text-2xl font-bold">Change Password</h1>

                    <div className="flex flex-col gap-1">
                        <label className="text-lg font-semibold" htmlFor="oldPassword">
                            Old Password
                        </label>
                        <input
                            required
                            type="password"
                            name="oldPassword"
                            id="oldPassword"
                            placeholder="Enter your old password"
                            className="bg-transparent px-2 py-1 border-b-2 outline-none focus:border-yellow-600 transition-all ease-in-out duration-300"
                              value={userPassword.oldPassword}
                              onChange={handlePasswordChange}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-lg font-semibold" htmlFor="newPassword">
                            New Password
                        </label>
                        <input
                            required
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            placeholder="Enter your new password"
                            className="bg-transparent px-2 py-1 border-b-2 outline-none focus:border-yellow-600 transition-all ease-in-out duration-300"
                              value={userPassword.newPassword}
                              onChange={handlePasswordChange}
                            />
                    </div>

                    <Link to={"/user/profile"}>
                        <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
                            <AiOutlineArrowLeft />Go Back to Profile
                        </p>
                    </Link>

                    <button
                        className="w-full bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
                        type="submit"
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default ChangePassword;