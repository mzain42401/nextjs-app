import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'

const signup = () => {
    const router = useRouter()
    const [firstNameError, setfirstNameError] = useState('')
    const [lastNameError, setlastNameError] = useState('')
    const [emailError, setemailError] = useState('')

    const [passwordError, setpasswordError] = useState('')
    const [repeatpasswordError, setrepeatpasswordError] = useState('')


    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const repeatpasswordRef = useRef()

    const onFormSubmit = async (e) => {
        e.preventDefault()
        const firstName = firstNameRef.current.value
        const lastName = lastNameRef.current.value
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const repeatpassword = repeatpasswordRef.current.value
        if (firstName.length < 3) {
            return setfirstNameError("name must be greater then 3")
        }
        if (lastName.length < 3) {
            return setlastNameError("lastname must be greater then 3")
        }
        if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            return setpasswordError("length  must be greater then 8 and uper case lower")
        }



        if (password !== repeatpassword) {
            return setrepeatpasswordError("must be same")
        }

        const res = await fetch('/api/authapi/signup', {
            method: "POST",
            body: JSON.stringify({ firstName, lastName, email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        // const data= await res.json()
        if (res.ok) {

            alert("signup successful")
            router.push('/auth/login')
        }
        else {
            const data = await res.json()
            setemailError(data.error)
        }



    }



    return (
        <>
            {/* <div className='bg-white shadow text-2xl font-bold p-2  shadow-gray-400'>
        <h1>Signup</h1>
      </div> */}
            <div className="flex min-h-full flex-1 flex-col justify-center  lg:px-8">


                <div className="p-6 bg-white shadow-lg border border-gray-200  border-solid shadow-gray-400 rounded-xl  mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <form className="space-y-6" onSubmit={onFormSubmit} >
                        <div>

                            <div className="mt-2">
                                <input
                                    id="text"
                                    placeholder='First Name'
                                    name="text"
                                    type="text"
                                    ref={firstNameRef}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset px-2 focus:ring-indigo-600 focus-visible:outline-indigo-600  sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div>{firstNameError && <p className='text-red-500 text-xs mt-1'>{firstNameError}</p>}</div>

                        </div>
                        <div>

                            <div className="mt-2">
                                <input
                                    id="text"
                                    name="text"
                                    placeholder='Last Name'
                                    type="text"
                                    ref={lastNameRef}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset px-2 focus:ring-indigo-600 focus-visible:outline-indigo-600  sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div>{lastNameError && <p className='text-red-500 text-xs mt-1'>{lastNameError}</p>}</div>

                        </div>
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
                            <div>{emailError && <p className='text-red-500 text-xs mt-1'>{emailError}</p>}</div>
                        </div>

                        <div>

                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    ref={passwordRef}
                                    type="password"
                                    placeholder='Password'
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset px-2 focus:ring-indigo-600 focus-visible:outline-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div>{passwordError && <p className='text-red-500 text-xs mt-1'>{passwordError}</p>}</div>

                        </div>
                        <div>

                            <div className="mt-2">
                                <input
                                    id="repeatpassword"
                                    ref={repeatpasswordRef}
                                    name="repeatpassword"
                                    type="password"
                                    placeholder='Repeat Password'
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset px-2 focus:ring-indigo-600 focus-visible:outline-indigo-600  sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div>{repeatpasswordError && <p className='text-red-500 text-xs mt-1'>{repeatpasswordError}</p>}</div>

                        </div>
                        <div className='flex justify-center'>
                            <button
                                type="submit"

                                className="flex w-full     justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 "
                            >
                                Signup
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default signup
