import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod';
import {useDispatch,useSelector} from 'react-redux'
import {NavLink, useNavigate} from 'react-router-dom'
import {registerUser} from '../authSlice'
import { useEffect ,useState} from 'react';

//schema validation for signup form

const signupSchema=z.object({
    firstName:z.string().min(3,"name should contain at least 3 chars"),
    emailId:z.string().email("Invalid Email"),
    password:z.string().min(8,"Password should contain at least 8 characters")
})


function Signup(){
    const [showPassword,setShowPassword]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {isAuthenticated, loading}=useSelector((state)=>state.auth); //Removed error as it wasn't 

    const {register,handleSubmit,formState :{errors},}=useForm({resolver:zodResolver(signupSchema)});
    
    useEffect(()=>{
        if(isAuthenticated){
            navigate('/');
        }
    },[isAuthenticated,navigate]);

    const onSubmit=(data)=>{
        dispatch(registerUser(data));
    }

    return (
        <div className='min-h-screen flex items-center justify-center p-4'>
            <div className='card w-96 bg-base-100 shadow-xl'>
                <div className='card-body'>
                   <h2 className='card-title justify-center text-3xl'>Leetcode</h2>
                   <form onSubmit={handleSubmit(onSubmit)}>
                     <div className='form-control'>
                        <label className='label mb-1'>
                            <span className='label-text'>First Name</span>
                        </label>
                        <input
                          type="text"
                          placeholder="John"
                          className={`input input-bordered ${errors.firstName && 'input-error'}`}
                          {...register('firstName')}
                        />
                        {errors.firstName && (
                            <span className='text-error'>{errors.firstName.message}</span>
                        )}
                     </div>

                     <div className='form-control mt-4'>
                        <label className='label mb-1'>
                            <span className='label-text'>Email</span>
                        </label>
                        <input
                          type="email"
                          placeholder="John@gmail.com"
                          className={`input input-bordered ${errors.emailId && 'input-error'}`}
                          {...register('emailId')}
                        />
                        {errors.emailId && (
                            <span className='text-error'>{errors.emailId.message}</span>
                        )}
                     </div>
                      {/*password with toggle*/}
                     <div className='form-control mt-4'>
                        <label className='label mb-1'>
                            <span className='label-text'>Password</span>
                        </label>
                        <div className='relative'>
                            <input
                            type={showPassword ? "text":"password"}
                            placeholder="********"
                            //Added pr-10 (padding-right) to make space for the button
                            className={`input input-bordered w-full pr-10  ${errors.password && 'input-error'}`}
                            {...register('password')}
                        />
                        <button
                            type="button"
                            className='absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-2xl'
                            onClick={()=>setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide Password" : "Show Password"} //Accessibility
                        >

                           {showPassword ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1.5 12s4.5-7.5 10.5-7.5S22.5 12 22.5 12 18 19.5 12 19.5 1.5 12 1.5 12z"
                              />
                                <circle cx="12" cy="12" r="3" />
                               </svg>
                           ):(
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="h-5 w-5"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                              >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M3 3l18 18"
                             />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10.584 10.587a2 2 0 002.828 2.828"
                              />
                              <path
                                strokeLinecap="round"
                                 strokeLinejoin="round"
                                  strokeWidth={2}
                                   d="M9.88 5.083A10.477 10.477 0 0112 4.5c6 0 10.5 7.5 10.5 7.5a18.68 18.68 0 01-3.478 4.568"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6.61 6.61C4.86 8.08 3.5 10.5 3.5 10.5s4.5 7.5 10.5 7.5c.66 0 1.3-.07 1.92-.2"
                              />
                            </svg>
                            )}
                           </button>
                        </div>
                        
                        {errors.password && (
                            <span className='text-error'>{errors.password.message}</span>
                        )}
                     </div>

                     <div className='form-control mt-6 flex justify-center'>
                        <button
                          type='submit'
                          className={`btn btn-primary ${loading ? 'loading' : ''}`}
                          disabled={loading}
                        >
                            {loading ? 'Signing Up...' : 'Signup'}
                        </button>
                     </div>  
                   </form>

                   {/*Login Redirect*/}
                   <div className='text-center mt-6'>{/*Increased mt for spacing */}
                      <span className='text-sm'>
                         Already have an account ?{' '}
                         <NavLink to="/login" className="link link-primary">
                            Login
                         </NavLink>
                      </span>
                   </div>
                </div> 
            </div>
        </div>
    );
}

export default Signup