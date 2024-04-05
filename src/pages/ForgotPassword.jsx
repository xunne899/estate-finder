import React, { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");


  const onChange = (e) => {
    setEmail( e.target.value);
  };

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Reset Password</h1>
      <div className=" flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 mx-auto">
          <img
            className="w-full rounded-2xl"
            src="https://cdn.pixabay.com/photo/2019/09/30/16/00/house-4516175_1280.jpg"
            alt="key"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form>
            <input
              className="w-full px-4 py-2 text-xl text-gray-300 border-2 border-gray-400 rounded transition ease-in-out mb-6"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Your Email"
            />
           
            <div className=" text-sm flex justify-between">
              <p>
                <Link
                  to="/register"
                  className="underline text-black hover:text-gray-500 hover:no-underline"
                >
                  Register Account
                </Link>
              </p>
              <p>
                <Link
                  to="/log-in"
                  className="text-blue-600 hover:text-blue-400"
                >
                 Login
                </Link>
              </p>
            </div>
            <button
            className="w-full mt-6 p-2 text-md text-white bg-red-500 hover:bg-red-600 rounded-md uppercase"
            type="submit"
          >
         Reset Password
          </button>
       <div className="flex items-center my-3 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300"><p className="text-center text-sm px-2">OR</p></div>

          <OAuth/>
           
          </form>
         
        </div>
      </div>
    </section>
  );
}
