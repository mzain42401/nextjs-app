import { getSession } from 'next-auth/react'
import React from 'react'

const index = ({session}) => {
  // const {user}=session
  console.log(session.user.email);

  return (
    <>
      profile,
      <br />{session.user.email}
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
