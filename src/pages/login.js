import React, { useState,useEffect,useRef, useContext } from 'react';
import AuthContext from '../context/authprovider';
import axios from '../api/axios';
const LOGIN_URL ='/auth'


const Login = () => {
    const {setAuth} = useContext(AuthContext)
    const userRef = useRef();
    const errRef = useRef();

const [user, setUser] = useState ('')
const [pwd, setPwd] = useState('')
const [errMsg, setErrMsg] = useState('')
const [success, setSuccess] = useState(false)

useEffect (() => {
    userRef.current.focus()
}, [])

useEffect(() => {
    setErrMsg('');
}, [user,pwd])

const handleSubmit = async(e) =>{
    e.preventDefault();

    try {
        const response = await axios.post(LOGIN_URL, JSON.stringify({user, pwd}),
        {
            headers: {'Content-Type' : 'application/json'}, withCredentials: true
        }
        );
        console.log(JSON.stringify(response?.data));
        console.log(JSON.stringify(response, "papapappapa"));
        const accessToken=response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({user,pwd,roles,accessToken})
           setUser('')
    setPwd('')
    setSuccess(true)
    } catch (error) {
        if(!error?.response) {
            setErrMsg('no server Response')
        }else if(error.response?.status === 400){
            setErrMsg("Missing Username or Password")
        }else if (error.response?.status === 401) {
            setErrMsg('unauthorized')
        }else {
            setErrMsg('Login Failed')
        }
        errRef.current.focus()
    }
 

}

    return(
        <>
        {success ? (
            <section>
                <h1>You are logged in!</h1>
                <p>
                    <a href='#'></a>
                </p>
            </section>
        ) : (
         <section id='login'>
            
            <div className='w-full max-w-xs m-auto mt-10'>
                <p ref={errRef} className={errMsg ? "errmsg" :"offscreen"} aria-live='assertive'>
            {errMsg}
            </p>
            <form
            onSubmit={handleSubmit}
            className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <div className='mb-4'>
                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='username'>
                    Username: </label>
            <input
             type='text'
             id='username'
             ref={userRef}
             autoComplete='off'
             onChange={(e) => setUser(e.target.value)} 
             value={user}
             required
             className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />   
                </div>

            <div className='mb-4'>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='password'>
                Password: </label>
            <input
             type='password'
             id='password'
             onChange={(e) => setPwd(e.target.value)} 
             value={pwd}
             required
             className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
           
            <button className='bg-blue-500 w-100 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"'> Sign in </button>

            <p>
            Need an Account?
            <a href='/'>Sign Up</a>
        </p>
        </form>    
            </div>
        
       
        </section>
        )
}
        </>
       
    )
}

export default Login