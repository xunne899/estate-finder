import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

import { db } from "../firebase";

export default function OAuth() {
  const navigate = useNavigate();

  async function onGoogleClick(e) {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // check for the user

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Authorization Error");
    }
  }
  return (
    <button
      type="button"
      onClick={onGoogleClick}
      className="w-full flex justify-center items-center mt-3 p-2 text-md text-white bg-blue-500 hover:bg-blue-600 rounded-md uppercase"
    >
      <FcGoogle className="bg-white rounded-md mr-3" />
      Continue with Google
    </button>
  );
}
