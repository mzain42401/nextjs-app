import { getSession } from 'next-auth/react'
import React from 'react'

const index = ({session}) => {
//   const {user}=session
//   const {email}=user
// console.log(email);
  // console.log(session.user.email);

  return (
    <>
      profile,
      <br />
      {/* {email}
      {session.user.email} */}

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
  return {
    props: {
      session
    },
  }
}
