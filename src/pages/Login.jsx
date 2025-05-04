import React from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Login() {

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

     const onSubmit = async (data) => {
  const { email, password } = data;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("✅ Logged in:", user.email);
    
    // ✅ Redirect to dashboard or any protected route
    navigate("/dashboard");
  } catch (error) {
    console.error("❌ Login failed:", error.message);
    alert("Login failed. Check your credentials and try again.");
  }
};

  return (
    <>
    <div className='flex justify-center items-center min-h-screen bg-indigo-200'>
        <div className='flex items-center justify-center p-15 bg-white rounded-lg shadow-xl'>
            <form onSubmit={handleSubmit(onSubmit)} 
            className='flex flex-col space-y-5'>
                    <Link to='/'>
                    <div className='flex items-center space-x-2 p-2 rounded-lg mb-5 bg-indigo-400 text-white w-44 hover:bg-indigo-600'>
                       <GoArrowLeft />
                        <div>Back to Home</div>
                    </div>
                    </Link>
                <div className='text-3xl text-center font-bold text-indigo-600'>
                    DENOVO.
                </div>
                <div className='text-xl text-center font-bold'>
                    Log In
                </div>
                <div className='flex flex-col space-y-2'>
                <label htmlFor=""
                className='text-lg font-semibold'
                >Email</label>
                <input  type="email"
                placeholder='email@com'
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/,
              message: "Invalid email format",
            },
          })}
                className='border border-black rounded-lg px-15 py-2 cursor-pointer'
                 />
                 {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>
               <div className='flex flex-col space-y-2'>
                <label htmlFor=""
                className='text-lg font-semibold'
                >Password</label>
                <input
          type="password"
          placeholder='p@$$w0rd'
          {...register("password", {
            required: "Password is required",
          })}
          className='border border-black rounded-lg px-15 py-2 cursor-pointer'
        />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}
               </div>
               <div>Dont have an account? 
                <Link to="/signup" className='font-medium underline'>  Sign Up</Link>
               </div>
               <div className='flex flex-col space-y-2 bg-indigo-400 py-2 rounded-lg w-40 justify-center hover:bg-indigo-600 mt-5 cursor-pointer'>
                <button type="submit" className='text-white text-lg cursor-pointer'>Log In</button>
               </div>
            </form>
        </div>
    </div>
    </>
  )
}
