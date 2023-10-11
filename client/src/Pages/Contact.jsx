import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { isValidEmail, isValidPassword } from "../Helpers/regexMatcher";
import axiosInstance from "../Helpers/axiosInstance";


function Contact(){

    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: "",
    });

    function handleInputChange(e){
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value,
        });
    }

    async function formSubmit(e){
        e.preventDefault();                   //to prevent the default behaviour of the button i.e. to submit the form
        
        if(!userInput.name || !userInput.email || !userInput.message){
            toast.error("Please fill all the fields");
            return;
        }

        //checking name field length
        if(userInput.name.length < 5){
            toast.error("Name should be atleast 5 characters long");
            return;
        }

        //checking email validity
        if(!isValidEmail(userInput.email)){
            toast.error("Please enter a valid email");
            return;
        }

        try {
            const response = axiosInstance.post("/contact", userInput);
            toast.promise(response, {
                loading: "Sending your message...",
                success: "Message sent successfully",
                error: (err) => {
                    return err?.response?.data?.message || "Something went wrong";
                }
            })
            const contactResponse = await response;
            if(contactResponse?.data?.success){
                setUserInput({
                    name: "",
                    email: "",
                    message: "",
                });
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Operation Failed");
        }

    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <form
                    onSubmit={formSubmit}
                    noValidate
                    className="text-white flex flex-col items-center justify-center gap-2 p-5 rounded-md shadow-[0_0_10px_black] w-[80%] sm:w-96"
                    action="">

                    <h1 className="text-3xl font-semibold my-2">
                        Contact Form
                    </h1>

                    <div className="flex flex-col w-full gap-1 mb-3">
                        <label htmlFor="name" className="text-xl font-semibold">
                            Name
                        </label>
                        <input 
                            type="text" 
                            className="bg-transparent border-b-2 focus:outline-none focus:border-yellow-500 px-2 py-2" 
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            onChange={handleInputChange}
                            value={userInput.name}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1 mb-3">
                        <label htmlFor="email" className="text-xl font-semibold">
                            Email
                        </label>
                        <input 
                            type="email" 
                            className="bg-transparent border-b-2 focus:outline-none focus:border-yellow-500 px-2 py-2" 
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleInputChange}
                            value={userInput.email}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-2 mb-3">
                        <label htmlFor="message" className="text-xl font-semibold">
                            Message
                        </label>
                        <textarea 
                            className="bg-transparent border-[1px] focus:outline-none focus:border-yellow-500 px-2 py-2 resize-none h-40" 
                            id="message"
                            name="message"
                            placeholder="Enter your message"
                            onChange={handleInputChange}
                            value={userInput.message}
                        />
                    </div>

                    <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-xl font-semibold">
                        Submit
                    </button>

                </form>
            </div>
            
        </HomeLayout>
    )
}

export default Contact;