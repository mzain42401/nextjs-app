import { getSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { checkByEmail } from "../api/services/user";
import { useRouter } from "next/router";

const index = ({ userData }) => {
  const router=useRouter()
  const [blogtitleError, setBlogtitleError] = useState();
  const [blogDiscriptionError, setBlogDiscriptionError] = useState();

  const blogTittleRef = useRef();
  const blogDiscriptionRef = useRef();
  const email = userData.email;
  const myDate = () => {
    const fulldate = new Date();
    const date = fulldate.getDate();

    return date;
  };
  const myDay = () => {
    const fulldate = new Date();
    const dayInNum = fulldate.getDay();
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const day = days[dayInNum];
    return day;
  };
  const myMont = () => {
    const fulldate = new Date();
    const month = fulldate.getMonth();
    return month + 1;
  };
  const myYear = () => {
    const fulldate = new Date();
    const year = fulldate.getFullYear();
    return year;
  };

  const day = myDay();
  const date = myDate();
  const month = myMont();
  const year = myYear();

  const publisfBlog =async (e) => {
    e.preventDefault();

    const blogTittle = blogTittleRef.current.value;
    const blogDiscription = blogDiscriptionRef.current.value;
    if (blogTittle.length < 10 || blogTittle.length > 90) {
      return setBlogtitleError(
        "Tittle must have minimum 10 and maximum 90 characters.  "
      );
    }
    if (blogDiscription.length < 50 || blogDiscription.length > 700) {
      return setBlogDiscriptionError(
        "Discription must have minimum 50 and maximum 700 characters. "
      );
    }

    const res=await fetch("/api/blogapi/postBlog", {
      method: "POST",
      body: JSON.stringify({
        blogTittle,
        blogDiscription,
        email,
        date,
        day,
        month,
        year,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      alert("Blog post succesfully")
      router.push('/myblogs')

    }
    
    blogTittleRef.current.value = ''
    blogDiscriptionRef.current.value=''
    
  };

  return (
    <>
      <div className="w-3/4 m-auto mt-12 px-8 p-6 shadow-lg border bg-white border-gray-200  border-solid shadow-gray-400 rounded-xl">
        <form onSubmit={publisfBlog}>
          <div>
            <input
              required
              ref={blogTittleRef}
              className="w-full  rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset px-2 focus:ring-indigo-600 focus-visible:outline-indigo-600  "
              type="text"
              placeholder="Enter your blog title"
            />
            <div>
              {blogtitleError && (
                <p className="text-red-500 text-xs mt-1">{blogtitleError}</p>
              )}
            </div>
          </div>

          <div>
            <textarea
              required
              ref={blogDiscriptionRef}
              className="w-full mt-6  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset px-2 focus:ring-indigo-600 focus-visible:outline-indigo-600  "
              placeholder="Enter your blog discription"
              cols="10"
              rows="08"
            ></textarea>
            <div>
              {blogDiscriptionError && (
                <p className="text-red-500 text-xs mt-1">
                  {blogDiscriptionError}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="  mt-6    rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  "
            >
              Publish blog
            </button>
          </div>
        </form>
      </div>
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
