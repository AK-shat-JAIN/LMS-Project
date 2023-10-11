import { useNavigate } from "react-router-dom";


function CourseCard({ data }){
    const navigate = useNavigate();
    
    return (
        <div 
            onClick={()=>navigate("/course/description", {state: {...data}})} 
            className="text-white w-[22rem] shadow-lg rounded-lg group cursor-pointer overflow-hidden bg-zinc-700">
            <div className="overflow-hidden">
                <img 
                    className="h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale-110 transform transition-all duration-300 ease-in-out"
                    src={data?.thumbnail?.secure_url}
                    alt="courese thumbnail" 
                />
                <div className="p-3 space-y-1 text-white">
                    <h2 className="text-2xl py-5 font-semibold text-yellow-500 line-clamp-3">
                        {data?.title}
                    </h2>
                    <p className="line-clamp-2">
                        {data?.description}
                    </p>
                    <p className="font-semibold">
                        <span className="text-yellow-500 font-bold">Category : </span>
                        {data?.category}
                    </p>
                    <p className="font-semibold">
                        <span className="text-yellow-500 font-bold">Total Lectures : </span>
                        {data?.numberOfLecture}
                    </p>
                    <p className="font-semibold">
                        <span className="text-yellow-500 font-bold">Instructor : </span>
                        {data?.createdBy}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CourseCard;