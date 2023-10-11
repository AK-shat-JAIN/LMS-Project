import { useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourseLecture, getCourseLecture } from "../../Redux/Slices/LectureSlice";

function DisplayLectures(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { lectures } = useSelector((state) => state?.lecture)
    const { role } = useSelector((state) => state?.auth)
    
    const [currentVideo, setCurrentVideo] = useState(0)

    async function onLectureDelete(courseId, lectureId){
        await dispatch(deleteCourseLecture({id: courseId, lectureId: lectureId}))
        dispatch(getCourseLecture(courseId))
    }

    useEffect(() => {
        if(!state) navigate("/courses");
        dispatch(getCourseLecture(state?._id))
    }, [])

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex flex-col justify-center items-center gap-10 py-10 text-white mx-3">
                <div className="text-center text-2xl font-semibold text-yellow-500">
                    Course Name : {state?.title}
                </div>
                {   
                    (lectures && lectures.length>0)  ?
                    (<div className="w-full flex flex-col sm:flex-row justify-center gap-5 sm:gap-10">
                        {/* Left section for playing videos and displaying course details to the admin */}
                        <div className="space-y-5 w-full sm:w-1/2 p-2 rounded-lg shadow-[0_0_10px_black]">
                            <video 
                                className="w-full max-h-[58vh] object-fit text-center rounded-tl-lg rounded-tr-lg"
                                src={lectures && lectures[currentVideo]?.lecture.secure_url}
                                controls
                                disablePictureInPicture
                                muted
                                controlsList="nodownload"
                            >
                                Your browser does not support the video tag.
                            </video>
                            <div className="sm:text-xl">
                                <h1>
                                    <span className="text-yellow-500">
                                        Title :&nbsp;
                                    </span>
                                    {lectures && lectures[currentVideo]?.title}
                                </h1>
                                <p className="line-clamp-4">
                                    <span className="text-yellow-500">
                                        Description :&nbsp;
                                    </span>
                                    {lectures && lectures[currentVideo]?.description}
                                </p>
                            </div>
                        </div>
                        {/* Right section for displaying list of lectures */}
                        <ul className="w-full sm:w-[28rem] p-4 rounded-lg shadow-[0_0_10px_black] space-y-2 sm:space-y-4">
                            <li className="text-xl sm:text-2xl mb-6 sm:mb-10 font-semibold text-yellow-500 flex items-center justify-between">
                                <p>Lectures List</p>
                                {role==="ADMIN" && (
                                    <button onClick={()=> navigate('/course/addlecture', {state: {...state}})} className="btn-primary px-2 py-1 rounded-md text-sm">
                                        Add New Lectures
                                    </button>       
                                )}
                            </li>
                            {lectures &&
                                lectures.map((lecture, index) => (
                                    <li 
                                        className="space-y-2 flex items-center justify-between"
                                        key={index}
                                    >
                                        <p className="cursor-pointer hover:text-yellow-500" onClick={() => setCurrentVideo(index)}> 
                                            <span>
                                                Lecture {index+1} :&nbsp;
                                            </span>
                                            {lecture.title}
                                        </p>
                                        {role==="ADMIN" && (
                                            <button onClick={() => onLectureDelete(state?._id, lecture?._id)} className="mt-0 btn btn-sm btn-outline btn-error px-2 py-1 rounded-md text-sm">
                                                Delete
                                            </button>       
                                        )}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>) 
                    : 
                    (role==="ADMIN") && (
                        <button onClick={()=> navigate('/course/addlecture', {state: {...state}})} className="btn-primary px-2 py-1 rounded-md text-xl">
                            Add New Lectures
                        </button>       
                    )
                }
            </div>
        </HomeLayout>
    )
}

export default DisplayLectures;