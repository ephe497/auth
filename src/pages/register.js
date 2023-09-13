import React, { useState,useEffect,useRef, useContext } from 'react';
import { faCheck, faRectangleTimes, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../api/axios';
import { json } from 'react-router-dom';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/signup';

const Register = () =>{
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        // if button enabled with JS hack
        const v1= USER_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg('Invalid Entry');
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,JSON.stringify({user,pwd}),
            {
                headers: { 'Content-Type':'application/json'},
                withCredentials: true
            })
       console.log(response.data);
       console.log(response.accessToken);
       console.log(JSON.stringify(response))
       setSuccess(true)
    //    clear input fields
        } catch (error) {
            if(!error?.response) {
                setErrMsg('no server Response')
            }else if(error.response?.status === 409){
                setErrMsg("Username Taken")
            }else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus()
        }
    }

    return(
        <>
        {
            success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
             <section>
<div className='w-full max-w-xs m-auto mt-10 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <p ref={errRef} className={errMsg ? "errmsg" :"offscreen"} aria-live='assertive'>
            {errMsg}
            </p>
            <h1 className='text-2xl'>Register</h1>
            <form
            onSubmit={handleSubmit}
            className='mt-5'>
                <div className='mb-4'>
                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='username'>
                    Username: 
                    <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                    </label>
            <input
             type='text'
             id='username'
             ref={userRef}
             autoComplete='off'
             onChange={(e) => setUser(e.target.value)} 
             required
             aria-invalid={validName ? "false" : "true"}
             aria-describeedby='uidnote'
             onFocus={() => setUserFocus(true)}
             onBlur={() => setUserFocus(false)}
             className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />   
               <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                </div>

            <div className='mb-4'>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='password'>
                Password: 
                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />

                </label>
            <input
             type='password'
             id='password'
             onChange={(e) => setPwd(e.target.value)} 
             value={pwd}
             required
             aria-invalid={validPwd ? "false" : "true"}
             aria-describeedby='pwdnote'
             onFocus={() => setPwdFocus(true)}
             onBlur={() => setPwdFocus(false)}
             className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
            </div>

            <div className='mb-4'>
            <label  className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
            </div>
           
            <button disabled={!validName || !validPwd || !validMatch ? true : false}
             className='bg-blue-500 w-100 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"'
            > 
             Sign up </button>

           
        </form>    
        <p>
                        Already registered?<br />
                        <span className="underline">
                            {/*put router link here*/}
                            <a href="login">Sign In</a>
                        </span>
                    </p>
            </div>
</section> 
            )
        }
      
        </>

    )
}

export default Register