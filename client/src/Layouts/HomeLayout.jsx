import { FiMenu } from 'react-icons/fi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../Redux/Slices/AuthSlice';

function HomeLayout({ children }){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //for checking if user is loggedin 
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    //for displaying the options according to the role
    const role = useSelector((state) => state?.auth?.role);

    function changeWidth(){
        const drawerSilde = document.getElementsByClassName('drawer-side');
        drawerSilde[0].style.width = 'auto';
    }

    function hideDrawer(){
        const element = document.getElementsByClassName('drawer-toggle');
        element[0].checked = false;

        const drawerSilde = document.getElementsByClassName('drawer-side');
        drawerSilde[0].style.width = '0';
    }

    async function handleLogout(e){
        e.preventDefault();                   //to prevent the default behaviour of the button i.e. to submit the form
        
        const response = await dispatch(logOut());
        if(response?.payload?.success){
            navigate('/');
        }
    }

    return(
        <div className="min-h-[90vh]">
            <div className="drawer absolute left-0 z-50 w-fit">
                <input type="checkbox" id="my-drawer" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu 
                            onClick={changeWidth}
                            size={"32px"}
                            className="font-bold text-white m-4" />
                    </label>
                </div>
                <div className='drawer-side w-0'>
                    <label htmlFor="my-drawer" className='drawer-overlay'></label>
                    <ul className="menu p-4 w-60 h-screen sm:w-80 bg-base-200 text-base-content relative">
                        <li className='w-fit absolute right-2 z-50'>
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={24} />
                            </button>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>

                        {isLoggedIn && role === 'ADMIN' && (
                            <li>
                                <Link to="/admin/dashboard">Admin Dashboard</Link>
                            </li>
                        )}
                        {isLoggedIn && role === 'ADMIN' && (
                            <li>
                                <Link to="/course/create">Create New Course</Link>
                            </li>
                        )}

                        <li>
                            <Link to="/courses">All Courses</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>

                        {!isLoggedIn && (
                            <li className='absolute bottom-4 w-[90%]'>
                                <div className='w-full flex items-center justify-center'>
                                    <Link className='btn-primary px-4 py-2 text-center font-semibold rounded-md w-full' to="/login">
                                        Login
                                    </Link>
                                    <Link className='btn-secondary px-4 py-2 text-center font-semibold rounded-md w-full' to="/signup">
                                        Sign up
                                    </Link>
                                </div>
                            </li>
                        )}

                        {isLoggedIn && (
                            <li className='absolute bottom-4 w-[90%]'>
                                <div className='w-full flex items-center justify-center'>
                                    <Link className='btn-primary px-4 py-2 text-center font-semibold rounded-md w-full' to="/user/profile">
                                        Profile
                                    </Link>
                                    <Link className='btn-secondary px-4 py-2 text-center font-semibold rounded-md w-full' onClick={handleLogout}>
                                        Logout
                                    </Link>
                                </div>
                            </li>
                        )}

                    </ul>
                </div>
            </div>

            {children}

            <Footer />
        </div>
    );
}

export default HomeLayout;