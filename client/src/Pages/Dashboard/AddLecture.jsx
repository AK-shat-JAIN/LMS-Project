import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";

function AddLecture(){

    const courseDetails = useLocation().state;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        id: courseDetails?._id,
        videoSrc: "",
        title: "",
        description: "",
        lecture: undefined
    })

    function handleChange(e){
        setUserInput({...userInput, [e.target.name]: e.target.value})
    }

    function removeVideo(){
        setUserInput({
            ...userInput,
            videoSrc: "",
            lecture: undefined
        })
    }

    function handleVideoUpload(e){
        const video = e.target.files[0];
        const videoUrl = window.URL.createObjectURL(video);
        setUserInput({
            ...userInput,
            videoSrc: videoUrl,
            lecture: video
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();

        if(!userInput.title || !userInput.description || !userInput.lecture){
            toast.error("Please fill all the fields")
            return;
        }
        
        const response = await dispatch(addCourseLecture(userInput))
        if(response?.payload?.success){
            setUserInput({
                id: courseDetails?._id,
                videoSrc: "",
                title: "",
                description: "",
                lecture: undefined
            })
            navigate(-1)
        }
    }

    useEffect(() => {
        if(!courseDetails){
            navigate("/courses")
        }
    }, [])

    return (
        <HomeLayout>
            <div className="min-h-[90vh] text-white flex flex-col justify-center items-center gap-10 mx-4 sm:mx-16">
                <div className="w-full sm:w-96 flex flex-col gap-5 p-3 shadow-[0_0_10px_black] rounded-lg">
                    <header className="relative flex justify-center items-center">
                        <button>
                            <AiOutlineArrowLeft 
                                className="absolute left-2 top-2 text-xl text-accent hover:text-yellow-400 cursor-pointer"
                                onClick={() => navigate(-1)}
                            />
                        </button>
                        <h1 className="text-xl text-yellow-500 font-semibold">
                            Add New Lecture
                        </h1>
                    </header>
                    <form 
                        className="flex flex-col gap-8"
                        onSubmit={onFormSubmit}
                    >
                        <input
                            className="bg-transparent px-3 py-1 border-b-2 focus:border-yellow-500 text-white outline-none"
                            type="text"
                            name="title"
                            placeholder="Title of the lecture"
                            value={userInput.title}
                            onChange={(e) => handleChange(e)}
                        />
                        <textarea
                            className="bg-transparent resize-none px-3 py-1 h-28 border-2 focus:border-yellow-500 text-white outline-none"
                            type="text"
                            name="description"
                            placeholder="Description of the lecture"
                            value={userInput.description}
                            onChange={(e) => handleChange(e)}
                        />
                        {userInput.videoSrc ? (
                            <div className="relative">
                                <video 
                                    className="w-full object-fit rounded-tl-lg rounded-tr-lg"
                                    src={userInput.videoSrc}
                                    controls
                                    disablePictureInPicture
                                    muted
                                    controlsList="nodownload nofullscreen"
                                >
                                    Your browser does not support the video tag.
                                </video>
                                <RxCrossCircled onClick={removeVideo} className="absolute right-2 top-2 text-red-500 text-3xl font-bold cursor-pointer" />
                            </div>                           
                        ) : (
                            <label className="flex flex-col items-center justify-center gap-2" htmlFor="lecture">
                                <span className="w-full px-4 py-2 text-center text-yellow-500 font-semibold sm:text-xl cursor-pointer border-2">Upload Video</span>
                                <input 
                                    className="hidden"
                                    type="file" 
                                    accept="video/*" 
                                    id="lecture"
                                    name="lecture"
                                    onChange={(e) => handleVideoUpload(e)}
                                />
                            </label>
                        )}
                        <button type="submit" className="btn btn-primary py-2 font-semibold sm:text-xl">
                            Add Lecture
                        </button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    )
}

export default AddLecture;