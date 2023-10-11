import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";
import { getPaymentRecords } from "../../Redux/Slices/RazorpaySlice";
import { Bar, Pie } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";

function AdminDashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allUsersCount, subscribedUsersCount } = useSelector(state => state.stat)
    const { allPayments, finalMonth, monthlySalesRecord } = useSelector(state => state.razorpay)
    const myCourses = useSelector(state => state.course.courseList)

    const userData = {
        labels: ["Registered Users", "Enrolled Users"],
        fontColor: "white",
        datasets: [
            {
                label: "User Details",
                data: [allUsersCount, subscribedUsersCount],
                backgroundColor: ["yellow", "green"],
                hoverBackgroundColor: ["cyan", "cyan"],
                borderWidth: 1,
                borderColor: ["black", "black"]
            }
        ]
    }

    const salesData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        fontColor: "white",
        datasets: [
            {
                label: "Sales / Month",
                data: monthlySalesRecord,
                fill: false,
                backgroundColor: ["rgba(255, 99, 132)"],
                borderColor: "white",
                borderWidth: 1
            }
        ]
    }

    async function onCourseDelete(id) {
        if(window.confirm("Are you sure you want to delete this course?")) {
            const res = await dispatch(deleteCourse(id))
            if(res?.payload?.success) {
                await dispatch(getAllCourses())
            } 
        }
    }

    useEffect(() => {
        (
            async() => {
                await dispatch(getAllCourses())
                await dispatch(getStatsData())
                await dispatch(getPaymentRecords())
            }
        )()
    }, [])

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-10 flex flex-col flex-wrap gap-12 text-white">
                <h1 className="text-center font-semibold text-3xl sm:text-5xl text-yellow-500">
                    Admin Dashboard
                </h1>
                <div className="grid sm:grid-cols-2 gap-5 m-auto mx-2 sm:mx-10">
                    <div className="flex flex-col items-center gap-6 sm:gap-10 sm:p-5 shadow-lg rounded-md">
                        <div className="w-60 h-60 sm:w-80 sm:h-80">
                            <Pie data={userData} />
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex items-center justify-center p-2 sm:p-5 gap-2 sm:gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="text-center font-semibold">Registered Users</p>
                                    <h3 className="text-2xl sm:text-4xl font-bold">{allUsersCount}</h3>
                                </div>
                                <FaUsers className="text-5xl text-yellow-500" />
                            </div>
                            <div className="flex items-center justify-center p-2 sm:p-5 gap-2 sm:gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="text-center font-semibold">Subscribed Users</p>
                                    <h3 className="text-2xl sm:text-4xl font-bold">{subscribedUsersCount}</h3>
                                </div>
                                <FaUsers className="text-5xl text-green-500" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-6 sm:gap-10 p-2 sm:p-5 shadow-lg rounded-md">
                        <div className="relative mx-auto w-full sm:h-80">
                            <Bar className="sm:absolute bottom-0 min-h-38 w-full mx-auto" data={salesData} />
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex items-center justify-center p-2 sm:p-5 gap-2 sm:gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="text-center font-semibold">Subscription Count</p>
                                    <h3 className="text-2xl sm:text-4xl font-bold">{allPayments?.count}</h3>
                                </div>
                                <FcSalesPerformance className="text-5xl" />
                            </div>
                            <div className="flex items-center justify-center p-2 sm:p-5 gap-2 sm:gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="text-center font-semibold">Total Revenue</p>
                                    <h3 className="text-2xl sm:text-4xl font-bold">{(allPayments?.count) ? (allPayments?.count)*499 : 0}</h3>
                                </div>
                                <GiMoneyStack className="text-5xl text-green-500" />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="sm:mx-[10%] w-full sm:w-[80%] flex flex-col justify-center items-center gap-6 sm:gap-10 mb-6 sm:mb-10">
                    <div className="w-[90%] flex items-center justify-between">
                        <h1 className="text-center text-lg sm:text-3xl font-semibold">
                            Courses Overview
                        </h1>
                        <button 
                            onClick={()=>navigate("/course/create")}
                            className="w-fit bg-yellow-500 px-2 sm:px-4 py-1 sm:py-2 font-semibold text-md sm:text-xl rounded-md shadow-md hover:bg-yellow-600 transition-all duration-300 ease-in-out"    
                        >
                            Create New Course
                        </button>
                    </div>

                    <div className="overflow-x-scroll sm:overflow-auto w-full">
                        <table className="table overflow-hidden">
                            <thead>
                                <tr>
                                    <th>S No</th>
                                    <th>Course Title</th>
                                    <th>Course Category</th>
                                    <th>Instructor</th>
                                    <th>Total Lectures</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    myCourses?.map((course, index) => {
                                        return(
                                            <tr key={course._id}>
                                                <td>{index+1}</td>
                                                <td>
                                                    <textarea className="w-40 h-auto bg-transparent resize-none" readOnly value={course.title}></textarea>
                                                </td>
                                                <td>{course.category}</td>
                                                <td>{course.createdBy}</td>
                                                <td>{course.numberOfLecture}</td>
                                                <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                                                    <textarea 
                                                        className="w-80 h-auto bg-transparent resize-none"
                                                        readOnly
                                                        value={course.description}
                                                    >
                                                    </textarea>
                                                </td>
                                                <td className="flex items-center gap-4 ">
                                                    <button 
                                                        className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 py-2 px-4 rounded-md text-xl"
                                                        onClick={()=>navigate(`/course/displaylectures`, {state: {...course}})}
                                                    >
                                                        <BsCollectionPlayFill />
                                                    </button>
                                                    <button 
                                                        className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 py-2 px-4 rounded-md text-xl"
                                                        onClick={()=>onCourseDelete(course?._id)}
                                                    >
                                                        <BsTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default AdminDashboard;