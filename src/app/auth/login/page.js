"use client";
import styles from '../../../styles.module.css';
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"

const loginSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});


export default function LoginForm  () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  

  const onSubmit = (data) => console.log(data);

    return (
        <div className=" bg-violet-700 h-full flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-black shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className=' flex justify-center items-center m-6 mb-0'>
            <h1 className=' text-violet-700 font-bold text-4xl'>Conversify!</h1>
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-violet-700 md:text-2xl ">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)} >
              <div>
                <label htmlFor="email" className="block mb-2 mr-3 text-base font-medium text-violet-700">Email</label>
                <input 
                   
                  name="email" 
                  id="email" 
                  className="font-kanit font-bold w-full text-white bg-black border-gray-400 border-4 border-double px-3 py-1 transition-all duration-300 focus:border-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-opacity-50" 
                  {...register("email")}
                  errors={errors.email}
                  />
                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 mr-3 text-base font-medium text-violet-700 ">Password</label>
                <input 
                  type="password"
                  name="password" 
                  id="password" 
                  placeholder="••••••••" 
                  {...register("password")}
                  errors={errors.password}
                  className="font-kanit font-bold w-full text-white bg-black border-gray-400 border-4 border-double px-3 py-1 transition-all duration-300 focus:border-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-opacity-50" 
                  />
                {errors.password && <p className="text-red-600">{errors.password.message}</p>}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"  />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-violet-700">Remember me</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-violet-700 text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
              <div className=' w-full flex items-center justify-center'>
                <button style={{fontWeight: 'bold', textDecoration: 'underline' }} className={styles['button-50']} >
                  Log In
                </button>
              </div>
              <p className="text-sm font-light text-violet-700">
                Don’t have an account yet? <a href="/auth/signUp" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
       
    )
}