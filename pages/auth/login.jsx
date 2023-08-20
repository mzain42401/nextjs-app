import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { signIn } from "next-auth/react"
import {BsGithub,BsGoogle,BsFacebook} from 'react-icons/bs'
const login = () => {

    const [error, setError] = useState('')
    const router = useRouter()

    const emailRef = useRef()
    const passwordRef = useRef()

    const onLoginFormSubmit = async (e) => {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value


        const response = await signIn('credentials', {
            redirect: false, email, password
        }
        )
        if (response.ok) {
            router.replace('/profile')
        }
        else {
            setError(response.error)
        }





    }





    return (
        <>
            {/* <div className='bg-white shadow text-2xl font-bold p-2 shadow-gray-400'>
                <h1>Login</h1>
            </div> */}

            <div className="flex  w-full h-full mt-10  flex-col justify-center items-center  ">


                <div className="p-6 shadow-lg border border-gray-200  border-solid shadow-gray-400 rounded-xl  mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <form className="space-y-6" onSubmit={onLoginFormSubmit} >


                        <div>

                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    ref={emailRef}
                                    placeholder='Email'
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset px-2 focus:ring-indigo-600 focus-visible:outline-indigo-600  sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div>{error === 'user not found' && <p className='text-red-500 text-xs mt-1'>{error}</p>}</div>

                        </div>

                        <div>

                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    ref={passwordRef}
                                    placeholder='Password'
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset px-2 focus:ring-indigo-600 focus-visible:outline-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div>{error === 'wrong password' && <p className='text-red-500 text-xs mt-1'>{error}</p>}</div>

                        </div>

                        <div className='flex justify-center'>
                            <button
                                type="submit"

                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 "
                            >
                                LogIn
                            </button>
                        </div>





                    </form>
                </div>


                <div className='flex justify-center mt-6 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <button
                        

                        className="flex w-full  justify-center items-center rounded-md border-2 border-indigo-600 text-indigo-600 hover:text-white px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 "
                    >
                      <span className='mr-[12px] text-[22px]/[29px]'><BsFacebook/></span>  FACEBOOK
                    </button>
                </div> <div className='flex justify-center mt-4 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <button
                        
                        

                        className="flex w-full  justify-center items-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6  border-2 border-indigo-600 text-indigo-600 hover:text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 "
                    >
                      <span className='mr-[24px] text-[22px]/[29px]'><BsGithub/></span>  GITHUB
                    </button>
                </div> <div className='flex justify-center mt-4 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <button
                        
                        

                        className="flex w-full  justify-center items-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6  border-2 border-indigo-600 text-indigo-600 hover:text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 "
                    >
                      <span className='mr-[22px] text-xl'><BsGoogle/></span>  GOOGLE
                    </button>
                </div>

            </div>


        </>
    )
}

export default login
