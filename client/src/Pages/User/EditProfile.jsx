import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";


function EditProfile(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({
        previewImage: useSelector((state) => state?.auth?.data?.avatar?.secure_id),
        fullName: "",
        avatar: "",
        userId: useSelector((state) => state?.auth?.data?._id),
    });

    function handleUserInput(e){
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    }

    function handleImageUpload(event){
        event.preventDefault();             //to prevent the default behaviour of the button i.e. to submit the form
        const uploadImage = event.target.files[0];

        if(uploadImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.addEventListener("load", function () {
                setData({
                    ...data,
                    avatar: uploadImage,
                    previewImage: this.result,
                });
            })
        }
    }

    async function onFormSubmit(event){
        event.preventDefault();

        if(!data.fullName || !data.avatar){
            toast.error("Please fill all the fields");
            return;
        }

        if(data.fullName.length < 5){
            toast.error("Full Name should be atleast 5 characters long");
            return;
        }

        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("avatar", data.avatar);

        await dispatch(updateProfile([data.userId, formData]));
        ;
        await dispatch(getUserData())

        navigate("/user/profile");
    }

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <form 
                    onSubmit={onFormSubmit}
                    className="flex flex-col gap-3 sm:gap-6 rounded-lg px-4 py-5 text-white w-[85%] sm:w-96 shadow-[0_0_10px_black]"
                >
                    <h1 className="text-center text-2xl text-white font-semibold">
                        Edit Profile
                    </h1>
                    <div className="flex flex-col gap-3 item-center justify-between">
                        <label className="w-28 h-28 rounded-full mx-auto cursor-pointer" htmlFor="image_upload">
                            {   
                                data.previewImage ? (
                                    <img src={data.previewImage} className="w-28 h-28 rounded-full m-auto" alt="User" />
                                ) : (
                                    <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
                                )
                            }
                        </label>
                        <p className="m-auto text-lg font-semibold">Update Profile Image</p>
                    </div>
                    
                    <input 
                        className="hidden" 
                        type="file" 
                        id="image_upload" 
                        name="image_upload"
                        accept=".jpg,.jpeg,.png,.svg"
                        onChange={handleImageUpload} 
                    />
                    <div className="flex flex-col gap-1">
                        <label className="text-lg font-semibold" htmlFor="fullName">
                            Full Name
                        </label>
                        <input 
                            className="px-2 py-1 bg-transparent border-b-2 focus:outline-none focus:border-b-yellow-600 bg-base-200"
                            required 
                            type="text" 
                            name="fullName" 
                            id="fullName" 
                            placeholder="Enter your Name" 
                            onChange={handleUserInput}
                            value={data.fullName}
                        />
                    </div>
                    <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer">
                        Update Profile
                    </button>
                    <Link to="/user/profile">
                        <p className="link text-accent text-center flex justify-center items-center cursor-pointer">
                            <AiOutlineArrowLeft /> Go Back to Profile
                        </p>
                    </Link>
                </form>
            </div>
        </HomeLayout>
    )

}

export default EditProfile;