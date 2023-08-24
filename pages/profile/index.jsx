import { getSession, } from 'next-auth/react'
import React, { useRef } from 'react'
import { checkByEmail } from '../api/services/user'

const index = ({ session, userData }) => {


  const { firstName } = userData
  const { lastName } = userData
  const email=session.user.email

  const oldPasswordRef=useRef()
  const newPasswordRef=useRef()
  const repeatNewPasswordRef=useRef()




  return (
    <>
      {/* <br />
     <p>{firstName }{lastName}</p>
     <button onClick={set}>click</button> */}

      <div className=' flex min-h-full flex-1 flex-col justify-center  lg:px-8 p-6 shadow-lg border border-gray-200  border-solid shadow-gray-400 rounded-xl  mt-6 sm:mx-auto sm:w-full sm:max-w-sm'>
        <div className='flex justify-center'><img className='h-28 ' src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" /></div>
        <div className='mt-6 text-2xl font-bold capitalize'>{`${firstName} ${lastName}`}</div>
        <div className='mt-2 text-sm'>{email}</div>
        <div className='mt-4  font-bold capitalize'>Password</div>
        <div className="mt-1">
          <input
            id="repeatpassword"
            name="repeatpassword"
            type="password"
ref={oldPasswordRef}
            placeholder='Old password'
            required
            className="block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset px-2 focus:ring-indigo-600 focus-visible:outline-indigo-600  sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-4">
          <input
            id="repeatpassword"
            name="repeatpassword"
            type="password"
            placeholder='New password'
            ref={newPasswordRef}
            required
            className="block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset px-2 focus:ring-indigo-600 focus-visible:outline-indigo-600  sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-4">
          <input
            id="repeatpassword"
            name="repeatpassword"
            type="password"
            placeholder='Repeat New password'
            ref={repeatNewPasswordRef}
            required
            className="block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset px-2 focus:ring-indigo-600 focus-visible:outline-indigo-600  sm:text-sm sm:leading-6"
          />
        </div>
        <div className='flex mt-4 '>
          <button
            type="submit"

            className="flex     justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  "
          >
            Update password
          </button>
        </div>


      </div>



    </>
  )
}

export default index


export const getServerSideProps = async ({ req }) => {

  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false
      }
    }

  }
  const userData = await checkByEmail(session.user.email)


  return {
    props: {
      session, userData
    },
  }
}
