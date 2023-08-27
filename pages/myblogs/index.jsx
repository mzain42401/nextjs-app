import { getSession } from "next-auth/react";
import React from "react";
import { checkByEmail } from "../api/services/user";

const index = ({ userData }) => {
  const { blogs } = userData;
  console.log(userData);
  console.log(blogs);
  return (
    <>
      {blogs.map((element) => {
        return (
          
            <div
              key={index}
              className="bg-white flex flex-wrap  shadow-lg shadow-gray-400 border border-gray-200 border-solid mt-7 w-3/4 m-auto rounded-lg p-5 "
            >
              <div className="flex  items-center ">
                <div>
                  <img
                    className="h-20 w-20 m-5 rounded-lg shadow shadow-gray-400"
                    src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="image"
                  />
                </div>
                <div className="flex flex-col  w-3/4 ">
                  
                    <h1 className="text-2xl  flex  items-center flex-wrap font-bold   ">
                      {element.blogTittle}
                    </h1>
                 
                  <p className="mt-2">date</p>
                </div>
              </div>

              <p className="m-5 text-base">ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg</p>
            </div>
          
        );
      })}
    </>
  );
};

export default index;

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  const userData = await checkByEmail(session.user.email);

  return {
    props: {
      session,
      userData,
    },
  };
};
