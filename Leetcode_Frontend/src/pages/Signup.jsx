import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod';
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {registerUser} from '../authSlice'
import { useEffect } from 'react';

//schema validation for signup form

const signupSchema=z.object({
    firstName:z.string().min(3,"name should contain at least 3 chars"),
    emailId:z.string().email("Invalid Email"),
    password:z.string().min(8,"Password should contain at least 8 characters")
})


function Signup(){

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {isAuthenticated, loading ,error}=useSelector((state)=>state.auth);

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
                    
                     <div className='form-control mt-4'>
                        <label className='label mb-1'>
                            <span className='label-text'>Password</span>
                        </label>
                        <input
                          type="password"
                          placeholder="********"
                          className={`input input-bordered ${errors.password && 'input-error'}`}
                          {...register('password')}
                        />
                        {errors.password && (
                            <span className='text-error'>{errors.password.message}</span>
                        )}
                     </div>

                     <div className='form-control mt-6 flex justify-center'>
                        <button
                          type='submit'
                          className='btn btn-primary'
                        >
                            Sign Up
                        </button>
                     </div>  
                   </form>
                </div> 
            </div>
        </div>
    );
}

export default Signup