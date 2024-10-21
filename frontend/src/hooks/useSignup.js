import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
 const [loading,setLoading] = useState(false);
 const {setAuthUser} = useAuthContext();

 const Signup = async({Fullname,username,password,confirmPassword,gender}) => {
    const success = handleInputsError({Fullname,username,password,confirmPassword,gender});
    if(!success){
        console.log("success");
        return;
    }

    setLoading(true);
    try {
        const res = await fetch("/api/auth/signup",{
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({Fullname,username,password,confirmPassword,gender})
        })

        const data = await res.json();

        if(data.error){
            throw new Error("yha pr mila");
        } 
        localStorage.setItem("chat-user", JSON.stringify(data));
        setAuthUser(data);     
        
    } catch (error) {
        toast.error(error.message);

    }
    finally{
        setLoading(false);
    }

 };
 return {loading,Signup};
};

export default useSignup;

function handleInputsError({Fullname,username,password,confirmPassword,gender}){
    if(!Fullname || !username || !password || !confirmPassword || !gender){
        toast.error("Please fills all the details");
        return false;
    }

    if(password !== confirmPassword){
        toast.error("Password don't match");
        return false;
    }
    if(password.lenth < 6){
        toast.error("Password must be at least 6 characters");
        return false;
    }

return true;
}