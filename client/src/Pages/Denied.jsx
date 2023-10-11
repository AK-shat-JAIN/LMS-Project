import { useNavigate } from "react-router-dom";


function Denied(){

    const navigate = useNavigate();

    return(
        // <div className="h-screen flex flex-col justify-center items-center">
        //     <h1 className="text-3xl font-bold text-center mt-10">
        //         You are not authorized to view this page
        //     </h1>
        //     <div className="flex items-center justify-center mt-10">
        //         <img src="https://media.giphy.com/media/3o7aDcz2YkVr0B0v5a/giphy.gif" alt="denied" />
        //     </div>
        // </div>
        <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">
                403
            </h1>
            <div className="bg-black text-white px-2 text-sm rotate-12 rounded absolute ">
                Access Denied
            </div>
            <button className="mt-5">
                <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring">
                    <span onClick={()=>navigate(-1)} className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                        Go Back
                    </span>
                </a>
            </button>
        </main>
    )
}

export default Denied;