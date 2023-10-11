import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import { useEffect } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import CourseCard from "../../Components/CourseCard";

function CourseList(){

    const dispatch = useDispatch();

    const {courseList} = useSelector((state) => state?.course);

    async function loadCourses(){
        await dispatch(getAllCourses());
    }

    useEffect(()=>{
        loadCourses();
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 pl-4 sm:pl-20 flex flex-col gap-10 text-white">
                <h1 className="text-center text-3xl font-semibold mb-5">
                    Expore the Courses made by&nbsp;
                    <span className="font-bold text-yellow-500">
                        Industry Experts
                    </span>
                </h1>
                <div className="mx-5 mb-10 flex flex-wrap justify-center gap-14">
                    {
                        courseList?.map((course) => {
                            return <CourseCard key={course._id} data={course} />
                        })
                    }
                </div>
            </div>
        </HomeLayout>
    )
}

export default CourseList;