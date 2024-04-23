import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper/modules";
import "swiper/css/bundle";
import { useNavigate } from "react-router-dom";

export default function Slider() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
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
    fetchListings();
  }, []);
 

  if (loading) return <Spinner />;
  if (listings.length === 0) return null;

  return (
    listings && (
      <>
        <Swiper
          // navigation
          slidesPerView={1}
          pagination={{ type: "progressbar" }}
          effect="slide"
          modules={[EffectFade]}
          autoplay={{ delay: 4500 }}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imgUrls[0]}) center, no-repeat`,
                  backgroundSize: "cover",
                }}
                className="relative w-full h-[68vh] overflow-hidden"
              >
                {/* introbox */}

              </div>

            </SwiperSlide>
          ))}

        </Swiper>
        
        <div  id="centerBox" className="flex justify-center items-center text-md">
        <h3 >Look no further for most trusted agent!</h3>
        </div>
        
        <div>
        <div className="flex justify-center items-center h-32 space-x-4" >

    <a href="https://github.com/xunne899" target="_blank" ><i class="fa-brands fa-square-github fa-2x"></i></a> <a href="https://www.facebook.com/" target="_blank"><i className="fab fa-facebook fa-2x"></i></a> <a href="https://www.instagram.com/" target="_blank" ><i class="fa-brands fa-instagram fa-2x"></i></a>  <a href="https://www.linkedin.com/in/yi-xun-t-16840537/" target="_blank" ><i class="fa-brands fa-linkedin fa-2x"></i></a>
    </div>
    <div className="flex justify-center align-middle m-2">
  <p>
  @2024 For Educational Purpose Only
  </p>
  </div>
        </div>
      </>
    )
  );
}