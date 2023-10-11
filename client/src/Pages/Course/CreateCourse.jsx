import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { createCourse } from "../../Redux/Slices/CourseSlice";


function CreateCourse(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        thumbnail: null,
        previewImage: "",
    });

    function handleUserInput(e){
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
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
                setUserInput({
                    ...userInput,
                    thumbnail: uploadImage,
                    previewImage: this.result,
                });
            })
        }
    }

    async function onFormSubmit(event){
        event.preventDefault();

        if(!userInput.title || !userInput.description || !userInput.category || !userInput.createdBy || !userInput.thumbnail){
            toast.error("Please fill all the fields");
            return;
        }

        const formData = new FormData();
        formData.append("title", userInput.title);
        formData.append("description", userInput.description);
        formData.append("category", userInput.category);
        formData.append("createdBy", userInput.createdBy);
        formData.append("thumbnail", userInput.thumbnail);

        const response = await dispatch(createCourse(formData));
        if(response?.payload?.success){
            setUserInput({
                title: "",
                description: "",
                category: "",
                createdBy: "",
                thumbnail: null,
                previewImage: "",
            });

            navigate('/courses');
        }

    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-[90vh]">
                <form
                    onSubmit={onFormSubmit} 
                    className="p-6 my-10 relative flex flex-col justify-center gap-5 rounded-lg text-white w-[80%] sm:w-[700px] shadow-[0_0_10px_black]"
                >
                    
                    <Link onClick={()=>navigate(-1)} className="absolute top-8 link text-accent">
                        <AiOutlineArrowLeft className="text-2xl" />
                    </Link>

                    <h1 className="mx-6 text-center text-2xl sm:text-4xl font-semibold">Create New Course</h1>

                    <main className="grid sm:grid-cols-2 gap-10 mt-8">
                        <div className="self-center">
                            <div>
                                <label htmlFor="image_upload" className="cursor-pointer">
                                    {userInput.previewImage ? (
                                        <img 
                                            className="w-full h-44 auto border-2"
                                            src={userInput.previewImage} 
                                            alt="" 
                                        />
                                    ) : (
                                        <div className="w-full h-44 m-auto flex items-center justify-center border">
                                            <h1 className="font-bold text-lg text-center">Upload your Course Thumbnail</h1>
                                        </div>
                                    )}
                                </label>
                                <input
                                    className="hidden"
                                    type="file" 
                                    id="image_upload"
                                    accept=".jpg, .jpeg, .png"
                                    name="image_upload"
                                    onChange={handleImageUpload}
                                />
                            </div>
                            <div className="flex flex-col gap-1 mt-5">
                                <label htmlFor="title" className="text-lg font-semibold">
                                    Course Title
                                </label>
                                <input 
                                    required
                                    className="bg-transparent px-2 py-1 border-b-2 border-white focus:outline-none focus:border-yellow-500"
                                    name="title"
                                    id="title"
                                    placeholder="Enter your Course Title"
                                    type="text"
                                    onChange={handleUserInput}
                                    value={userInput.title}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="createdBy" className="text-lg font-semibold">
                                    Course Instructor
                                </label>
                                <input 
                                    required
                                    className="bg-transparent px-2 py-1 border-b-2 border-white focus:outline-none focus:border-yellow-500"
                                    name="createdBy"
                                    id="createdBy"
                                    placeholder="Enter your Course Instructor"
                                    type="text"
                                    onChange={handleUserInput}
                                    value={userInput.createdBy}
                                />
                            </div>
                            <div className="flex flex-col gap-1 mt-2">
                                <label htmlFor="category" className="text-lg font-semibold">
                                    Course Category
                                </label>
                                <input 
                                    required
                                    className="bg-transparent px-2 py-1 border-b-2 border-white focus:outline-none focus:border-yellow-500"
                                    name="category"
                                    id="category"
                                    placeholder="Enter your Course Category"
                                    type="text"
                                    onChange={handleUserInput}
                                    value={userInput.category}
                                />
                            </div>
                            <div className="flex flex-col gap-1 mt-2">
                                <label htmlFor="description" className="text-lg font-semibold">
                                    Course Description
                                </label>
                                <textarea 
                                    required
                                    className="bg-transparent cvourflow-x-none overflow-y-scroll resize-none px-2 h-24 py-1 border-2 border-white focus:outline-none focus:border-yellow-500"
                                    name="description"
                                    id="description"
                                    placeholder="Enter your Course Description"
                                    onChange={handleUserInput}
                                    value={userInput.description}
                                />
                            </div>
                        </div>
                    </main>                    

                    <button type="submit" className="mt-3 py-2 text-lg font-semibold w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-lg">
                        Create Course
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default CreateCourse;