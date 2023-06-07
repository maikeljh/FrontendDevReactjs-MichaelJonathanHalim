import axios from "axios";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import ReactStars from "react-stars";
import Profile from "../assets/profile.png";

const RestaurantDetail = () => {
  const [detail, setDetail] = useState(null);
  const [loadMore, setLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/detail/${id}`)
      .then((response) => {
        setIsLoading(false);
        setDetail(response.data.restaurant);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  return (
    <>
      {isLoading ? (
        <div className="mx-auto">
          <Oval
            height={80}
            width={80}
            color="rgb(31 41 55)"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="rgb(31 41 55)"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-4 mx-auto w-full items-center">
          <Link
            className="mr-auto text-xl font-semibold cursor-pointer"
            to={"/"}
          >
            ← Back
          </Link>
          <img
            alt="restaurant"
            src={`https://restaurant-api.dicoding.dev/images/large/${detail?.pictureId}`}
            className="max-w-[30rem] mx-auto"
          />
          <h2 className="font-bold text-3xl mx-auto">{detail?.name}</h2>
          <span className="flex flex-row items-center gap-2 text-xl font-semibold mx-auto">
            Rating :{" "}
            <ReactStars
              count={5}
              value={detail?.rating}
              edit={false}
              color2={"rgb(31 41 55)"}
              size={20}
              className="p-0"
            />
          </span>
          <h3 className="text-2xl mx-auto font-semibold mt-2">Reviews</h3>
          {loadMore || detail?.customerReviews.length <= 3 ? (
            <div className="flex flex-col gap-4 max-w-2xl w-full">
              {detail?.customerReviews.map((el, idx) => (
                <div
                  className="flex flex-col gap-4 bg-gray-800 p-4 rounded-xl text-white"
                  key={idx}
                >
                  <div className="flex flex-row items-center">
                    <div className="flex flex-row items-center gap-3">
                      <img
                        src={Profile}
                        alt="profile"
                        className="w-[2rem] rounded-xl"
                      />
                      <span className="font-bold">{el.name}</span>
                    </div>
                    <span className="ml-auto font-semibold">{el.date}</span>
                  </div>
                  <p>{el.review}</p>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4 max-w-2xl w-full">
                {detail?.customerReviews.slice(0, 3).map((el, idx) => (
                  <div
                    className="flex flex-col gap-4 bg-gray-800 p-4 rounded-xl text-white"
                    key={idx}
                  >
                    <div className="flex flex-row items-center">
                      <div className="flex flex-row items-center gap-3">
                        <img
                          src={Profile}
                          alt="profile"
                          className="w-[2rem] rounded-xl"
                        />
                        <span className="font-bold">{el.name}</span>
                      </div>
                      <span className="ml-auto font-semibold">{el.date}</span>
                    </div>
                    <p>{el.review}</p>
                  </div>
                ))}
              </div>
              <button
                className="border-2 border-gray-800 w-1/3 py-2 mx-auto mt-4"
                onClick={() => setLoadMore(true)}
              >
                Load More
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default RestaurantDetail;
