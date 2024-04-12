import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";

export default function Header() {
  const [pageState, setPageState] = useState("Login");
  const location = useLocation();
  console.log(location.pathname);

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setPageState("Profile") : setPageState("Login");
    });
  }, [auth]);

  const MatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };
  return (
    <div className="bg-white border-t shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center p-5 max-w-8xl mx-auto">
        <div>
          <img
            src="https://cdn.pgimgs.com/hive-ui/static/v0.1.3/logo/pg-horizontal.svg"
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-9">
            <li
              className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-transparent cursor-pointer 
              ${MatchRoute("/") && "text-stone-900 border-b-red-600"}`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-transparent cursor-pointer
              ${MatchRoute("/offers") && "text-stone-900 border-b-red-600"}`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>

            <li
              className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-transparent cursor-pointer
              ${
                (MatchRoute("/log-in") || MatchRoute("/profile")) &&
                "text-stone-900 border-b-red-600"
              }`}
              onClick={() => navigate("/profile")}
            >
              {pageState}
            </li>

            {/* added avatar */}
            

            {/* <div className="relative inline-block text-left mt-2">
              <div className="group">
              <button type="button"
            class="inline-flex justify-center items-center w-full px-3 py-2 text-sm font-medium text-white bg-gray-300 hover:bg-gray-400 focus:outline-none focus:bg-gray-400 rounded-full">
                  <span className="font-medium text-gray-600">
                    JL
                  </span>
                  </button>

                <div className="absolute left-0 w-40 mt-1 z-50 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible transition duration-900 invisible ">
                  <div className="py-1">
                    <a
                      href="#"
                      className={`block px-4 py-2 text-sm text-gray-700 ${
                        (MatchRoute("/log-in") || MatchRoute("/profile")) &&
                        " hover:bg-gray-100"
                      }`}
                      onClick={() => navigate("/profile")}
                    >
                        {pageState}
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Option 2
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Option 3
                    </a>
                  </div>
                </div>
              </div>
            </div> */}

            {/* avatar end */}
            <button className="bg-red-500 hover:bg-red-600  font-bold px-6 rounded-full">
              <li
                className={`py-3 text-sm font-semibold text-gray-800 border-b-[3px]  border-transparent cursor-pointer
              ${MatchRoute("/register") && "text-black"}`}
                onClick={() => navigate("/register")}
              >
                Register
              </li>
            </button>
          </ul>
        </div>
      </header>
    </div>
  );
}
