import React, { useState } from "react";
import { getAuth,updateProfile } from "firebase/auth";
import { getDoc, doc,updateDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";



export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [changeDetail, setChangeDetail] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email:auth.currentUser.email,
  });

  const { name, email } = formData;
  const onLogOut =()=>{
     auth.signOut()
     navigate("/")
  }
  const onChange =(e)=> {
    setFormData((prev)=>({
   ...prev,[e.target.id]:e.target.value
    }))
  }
  async function onSubmit(){
    try {
      if(auth.currentUser.displayName !== name){
        //update display name in firebase auth
        await updateProfile(auth.currentUser,{
          displayName:name,
        })
        //update name in the firestone
        const docRef = doc(db,"users",auth.currentUser.uid)
        await updateDoc(docRef,{
          name,
        })
      }
      toast.success("Profile Updated")
    } catch (error) {
      toast.error("Unable to process update, please try again")
    }

  }
  return (

    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col ">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            {/* name */}
            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
              className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border-2 border-gray-300 rounded transition ease-in-out mb-6 ${changeDetail && "bg-red-200 focus:bg-red-200"}`}
            />
            {/* email */}
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-2 border-gray-300 rounded transition ease-in-out mb-6"
            />
            <div className="flex justify-between whitespace-nowrap text-sm lg:text-lg">
              <p className="flex items-center mb-6">
                Want to change your name?
                <span onClick={()=>{
                  changeDetail && onSubmit();
                  setChangeDetail((prev)=>!prev)}} className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer">
                   {changeDetail? "Apply Changes":"Edit"}
                   </span>
              </p>
              <p onClick={onLogOut} className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer">
                Log Out
                </p>
            </div>
          </form>
          <button className="flex justify-center items-center w-full p-2 text-md text-white bg-green-500 hover:bg-green-600 rounded-md uppercase" type="submit">
          <FcHome className="mr-2 bg-transparent bg-rounded"/>Sell or rent your property
          </button>

        </div>
      </section>
    </>
  );
}
