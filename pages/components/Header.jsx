import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { data } = useSession();
  return (
    <>
      <nav className="flex justify-between w-full p-1 text-white items-center px-3 h-14 text-[18px] bg-indigo-600">
        <div>Personal Blogging App</div>
        <ul className="flex justify-center items-center">
          {data ? (
            <>
              
              <li className="mx-6">
                <Link href="/myblogs">my blogs</Link>
              </li>
              <li className="mx-6">
                <Link href="/profile">profile</Link>
              </li>
              <li className="mx-6">
                <button onClick={signOut}>logout</button>
              </li>
            </>
          ) : (
            <li className="mx-6">
              <Link href="/auth/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;
