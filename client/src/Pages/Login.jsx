import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { logIn } from "../Redux/Slices/AuthSlice";


function Login(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    function handleUserInput(e){
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    }

    async function onLogin(event){
        event.preventDefault();                   //to prevent the default behaviour of the button i.e. to submit the form
        
        if(!loginData.email || !loginData.password){
            toast.error("Please fill all the fields");
            return;
        }

        // const formData = new FormData();
        // formData.append("email", signupData.email);
        // formData.append("password", signupData.password);
        // ****************Its not mandatory to use FormData, we can also use a simple object ****************

        //dispatch login action
        const response = await dispatch(logIn(loginData));
        if(response?.payload?.success){
            navigate('/');
        }

        setLoginData({
            email: "",
            password: "",
        });
    }

    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <form noValidate onSubmit={onLogin} className="px-6 flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-[80%] sm:w-96 shadow-[0_0_10px_black]" action="">
                    <h1 className="text-center text-2xl font-bold">Login Page</h1>

                    <div className="mt-3 flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold"> Email </label>
                        <input 
                            type="email" 
                            required
                            name="email" 
                            id="email" 
                            placeholder="Enter your email"
                            className="bg-transparent px-2 py-1 border-b-2 border-white focus:outline-none focus:border-yellow-500"
                            onChange={handleUserInput}
                            value={loginData.email}
                        />
                    </div>
                    <div className="mt-3 flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold"> Password </label>
                        <input 
                            type="password" 
                            required
                            name="password" 
                            id="password" 
                            placeholder="Enter your password"
                            className="bg-transparent px-2 py-1 border-b-2 border-white focus:outline-none focus:border-yellow-500"
                            onChange={handleUserInput}
                            value={loginData.password}
                        />
                    </div>

                    <button type="submit" className="mt-3 py-2 text-lg font-semibold w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-lg">
                        Login
                    </button>

                    <p className="text-center">
                        Create an account? <Link to="/signup" className="link text-accent cursor-pointer">Signup</Link>
                    </p>

                </form>
            </div>
        </HomeLayout>
    )
}

export default Login;