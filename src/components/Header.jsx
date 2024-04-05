import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  console.log(location.pathname);

const navigate = useNavigate();

  const MatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };
  return (
    <div className="bg-white border-t shadow-sm sticky top-0">
      <header className="flex justify-between items-center p-5 max-w-8xl mx-auto">
        <div>
          <img
            src="https://cdn.pgimgs.com/hive-ui/static/v0.1.3/logo/pg-horizontal.svg"
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={()=>navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-transparent cursor-pointer 
              ${MatchRoute("/") && "text-stone-900 border-b-red-600"}`
            }
            onClick={()=>navigate("/")}
            >
              Home
            </li>
            <li
              className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-transparent cursor-pointer
              ${
                MatchRoute("/offers") && "text-stone-900 border-b-red-600"
              }`}
              onClick={()=>navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-transparent cursor-pointer
              ${
                MatchRoute("/sign-in") && "text-stone-900 border-b-red-600"
              }`}
              onClick={()=>navigate("/sign-in")}
            >
              SignIn
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
