import { isValidElement, useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createAccount } from "../Redux/Slices/AuthSlice";
import { isValidEmail, isValidPassword } from "../Helpers/regexMatcher";


function Signup(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState("");

    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: "",
    });

    function handleUserInput(e){
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value,
        });
    }

    function getImage(event){
        event.preventDefault();             //to prevent the default behaviour of the button i.e. to submit the form
        //getting the image
        const uploadedImage = event.target.files[0];
        // console.log(uploadedImage)

        if(uploadedImage){
            setSignupData({
                ...signupData,
                avatar: uploadedImage,
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            // fileReader.onloadend = () => {
            //     setPreviewImage(fileReader.result);
            // };
            // OR
            fileReader.addEventListener("load", function () {
                setPreviewImage(this.result);
            })
        }
    }

    async function createNewAccount(e){
        e.preventDefault();                   //to prevent the default behaviour of the button i.e. to submit the form
        
        if(!signupData.fullName || !signupData.email || !signupData.password || !signupData.avatar){
            toast.error("Please fill all the fields");
            return;
        }

        //checking name field length
        if(signupData.fullName.length < 5){
            toast.error("Name should be atleast 5 characters long");
            return;
        }

        //checking email validity
        if(!isValidEmail(signupData.email)){
            toast.error("Please enter a valid email");
            return;
        }

        //checking password validity
        if(!isValidPassword(signupData.password)){
            toast.error("Password should be 6 - 16 characters long and should contain atleast 1 number and 1 special character");
            return;
        }

        const formData = new FormData();
        formData.append("fullName", signupData.fullName);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);

        //dispatch create account action
        const response = await dispatch(createAccount(formData));
        if(response?.payload?.success){
            setSignupData({
                fullName: "",
                email: "",
                password: "",
                avatar: "",
            });
            setPreviewImage("");

            navigate('/');
        }
    }

    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <form noValidate onSubmit={createNewAccount} className="px-6 flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-[80%] sm:w-96 shadow-[0_0_10px_black]" action="">
                    <h1 className="text-center text-2xl font-bold">Registeration Page</h1>

                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage ? (
                            <img src={previewImage} className="w-24 h-24 rounded-full m-auto" alt="User" />
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded m-auto" />
                        )}
                    </label>
                    <input 
                        type="file" 
                        id="image_uploads" 
                        name="image_uploads" 
                        className="hidden" 
                        accept=".jpg, .jpeg, .png, .svg" 
                        onChange={getImage}
                    />
                    
                    <div className="mt-3 flex flex-col gap-1">
                        <label htmlFor="fullName" className="font-semibold"> Name </label>
                        <input 
                            type="text" 
                            required
                            name="fullName" 
                            id="fullName" 
                            placeholder="Enter your Name"
                            className="bg-transparent px-2 py-1 border-b-2 border-white focus:outline-none focus:border-yellow-500"
                            onChange={handleUserInput}
                            value={signupData.fullName}
                        />
                    </div>
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
                            value={signupData.email}
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
                            value={signupData.password}
                        />
                    </div>

                    <button type="submit" className="mt-3 py-2 text-lg font-semibold w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-lg">
                        Create Account
                    </button>

                    <p className="text-center">
                        Already have an account? <Link to="/login" className="link text-accent cursor-pointer">Login</Link>
                    </p>

                </form>
            </div>
        </HomeLayout>
    )
}

export default Signup;