import React from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import { GoArrowLeft } from "react-icons/go";
import { auth, db } from "../firebaseConfig"; // Your firebase config
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


export default function Signup() {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const navigate = useNavigate();

      const onSubmit = async (data) => {
        const { name, email, password } = data;
      
        try {
         
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
      
         
          await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            createdAt: new Date(),
          });
      
          console.log("✅ User signed up and saved to Firestore");
          navigate('/dashboard');
      
        } catch (error) {
          console.error("❌ Sign-up failed:", error.message);
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
                    Sign Up
                </div>
                <div className='flex flex-col space-y-2'>
                <label htmlFor=""
                className='text-lg font-semibold'
                >Name</label>
                <input
                placeholder='John Doe'
            {...register("name", { required: "Name is required" })}
            className='border border-black rounded-lg px-15 py-2'
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
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
                className='border border-black rounded-lg px-15 py-2'
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
          className='border border-black rounded-lg px-15 py-2'
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
               </div>
               <div className='flex flex-col space-y-2 bg-indigo-400 py-2 rounded-lg w-40 justify-center hover:bg-indigo-600 mt-5'>
                <button type="submit" className='text-white text-lg'>Sign Up</button>
               </div>
            </form>
        </div>
    </div>
    </>
  )
}
