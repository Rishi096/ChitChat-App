import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup';

const SignUp = () => {
    const [inputs,setInputs] = useState({
        Fullname:'',
        username:'',
        password:'',
        confirmPassword:'',
        gender:'',
    });

   const {loading,Signup} = useSignup();

   const checkBoxHandler = (gender) =>{
    setInputs({...inputs,gender});
   }

    const submitHandler = async(event) => {
        event.preventDefault();
        console.log(inputs);
        setInputs({
        Fullname:'',
        username:'',
        password:'',
        confirmPassword:'',
        gender:'',
        });        
        await Signup(inputs);
    }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
       <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg 
        bg-opacity-1  '>
            <h1 className='text-3xl font-semibold text-center text-gray-300'>
                     SignUp
                    <span className='text-blue-500 '> ChatApp</span>
                </h1>
                <form onSubmit={submitHandler}>
                    <div>
                        <label className='label p-2'>
                            <span className='font-semibold text-base label-text '>Fullname</span>
                        </label>
                        <input type='text' 
                        placeholder='Enter your Name' 
                        className='w-full input input-bordered h-10'
                        value={inputs.Fullname}
                        onChange={(e) => setInputs({...inputs,Fullname:e.target.value})}
                        />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='font-semibold text-base label-text '>Username</span>
                        </label>
                        <input type='text' 
                        placeholder='Enter Username'
                        className='w-full input input-bordered h-10'
                        value={inputs.username}
                        onChange={(e) => setInputs({...inputs,username:e.target.value})}
                        />
                    </div>
                    <div>
                    <label className='label p-2'>
                            <span className='font-semibold text-base label-text '>Password</span>
                    </label>
                    <input type='password' 
                    placeholder='Enter Password'
                    className='w-full input input-bordered h-10'
                    value={inputs.password}
                    onChange={(e) => setInputs({...inputs,password:e.target.value})}/>
                    </div>
                    <div>
                    <label className='label p-2'>
                            <span className='text-base font-semibold label-text '>Confirm Password</span>
                        </label>
                    <input type='password' 
                    placeholder='Confirm Password'
                    className='w-full input input-bordered h-10'
                    value={inputs.confirmPassword}
                    onChange={(e) => setInputs({...inputs,confirmPassword:e.target.value})}
                    />
                    </div>

                   <GenderCheckbox onCheckBoxChange = {checkBoxHandler} selectedGender = {inputs.gender}/>
                  

                    <Link to="/login" className='font-bold text-sm hover:underline hover:text-blue-500 mt-2 inline-block  ' >
                     Already have an account?
                    </Link>
                    <div>
                        <button className='btn btn-block btn-sm mt-2'
                        disabled={loading}>
                        {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
                        </button>
                    </div>
                </form>
        </div>

    </div>
  )
}

export default SignUp



// Stater code for Sign up component
// import React from 'react'
// import GenderCheckbox from './GenderCheckbox'

// const SignUp = () => {
//   return (
//     <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
//        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg 
//         bg-opacity-1  '>
//             <h1 className='text-3xl font-semibold text-center text-gray-300'>
//                      SignUp
//                     <span className='text-blue-500 '> ChatApp</span>
//                 </h1>
//                 <form >
//                     <div>
//                         <label className='label p-2'>
//                             <span className='font-semibold text-base label-text '>Fullname</span>
//                         </label>
//                         <input type='text' 
//                         placeholder='Enter your Name' className='w-full input input-bordered h-10'/>
//                     </div>
//                     <div>
//                         <label className='label p-2'>
//                             <span className='font-semibold text-base label-text '>Username</span>
//                         </label>
//                         <input type='text' 
//                         placeholder='Enter Username' className='w-full input input-bordered h-10'/>
//                     </div>
//                     <div>
//                     <label className='label p-2'>
//                             <span className='font-semibold text-base label-text '>Password</span>
//                     </label>
//                     <input type='password' 
//                     placeholder='Enter Password'
//                     className='w-full input input-bordered h-10'/>
//                     </div>
//                     <div>
//                     <label className='label p-2'>
//                             <span className='text-base font-semibold label-text '>Confirm Password</span>
//                         </label>
//                     <input type='paasword' 
//                     placeholder='Confirm Password'
//                     className='w-full input input-bordered h-10'/>
//                     </div>

//                    <GenderCheckbox />

//                     <a href='#' className='font-semibold text-sm hover:underline hover:text-blue-500 mt-2 inline-block  ' >
//                      Already have an account ?
//                     </a>
//                     <div>
//                         <button className='btn btn-block btn-sm mt-2'>Login</button>
//                     </div>
//                 </form>
//         </div>

//     </div>
//   )
// }

// export default SignUp