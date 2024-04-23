import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";
import { useEffect } from "react";
import ListingItem from "../components/ListingItem";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
    joinDate: new Date(auth.currentUser.metadata.creationTime).toDateString(),
  });
  const { name, email, joinDate } = formData;
  //logout
  function onLogout() {
    auth.signOut();
    navigate("/");
  }
  //When changing
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  //when during submission
  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        //update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        //update name in the firestone
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Name Updated", {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error("Unable to process update, please try again");
    }
  }

  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      console.log(querySnap);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);

  async function onDelete(listingID) {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "listings", listingID));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingID
      );
      setListings(updatedListings);
      toast.success("Successfully deleted the listing");
    }
  }

  const onEdit = (listingID) => {
    navigate(`/edit-listing/${listingID}`);
  };
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col ">
        <h1 className="text-3xl text-center mt-6 font-bold">Profile</h1>
        <div class="flex items-center gap-4 mt-6">
          <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-400 rounded-full dark:bg-gray-600">
            <span class="font-medium text-gray-600 dark:text-gray-300">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div class="font-medium dark:text-white">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              Joined Since {joinDate}
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400"> {name}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">{email}</div>
          </div>
        </div>
        <div className="w-full md:w-[50%] mt-6 px-3">
          {/* name */}
          <div className="flex justify-center">
            {changeDetail ? (
              <input
                type="text"
                id="name"
                value={name}
                disabled={!changeDetail}
                onChange={onChange}
                className={`w-40 px-2 py-1 text-sm text-gray-700 bg-white border-2 border-gray-300 rounded transition ease-in-out mb-4 ${
                  changeDetail && "bg-red-200 focus:bg-red-200"
                }`}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="flex justify-center space-x-9 whitespace-nowrap text-sm lg:text-lg">
            <p className="flex items-center mb-6 text-sm">
              Change your name?
              <span
                onClick={() => {
                  changeDetail && onSubmit();
                  setChangeDetail((prev) => !prev);
                }}
                className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
              >
                {changeDetail ? "Confirm Changes" : "Edit"}
              </span>
            </p>

            <p
              onClick={onLogout}
              className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm font semi-bold"
            >
              Log Out
            </p>
          </div>
        </div>
      </section>
      <div className="max-w-6xl px-3 m-6 mx-auto">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold mb-6">
              Listings
            </h2>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
