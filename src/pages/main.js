import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/card";
import Header from "../components/header";

const Main = () => {
  const [restaurants, setRestaurants] = useState([{}, {}, {}, {}]);
  const [loadMore, setLoadMore] = useState(false);

  const headerContent = {
    title: "Restaurants",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
      ut aliquip ex ea commodo consequat.`,
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/list`)
      .then((response) => {
        setRestaurants(response.data.restaurants);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Header title={headerContent.title} content={headerContent.content} />
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl">All Restaurants</h1>
        {loadMore ? (
          <div className="grid grid-cols-4 gap-8">
            {restaurants.map((el, idx) => (
              <Card
                key={idx}
                id={el.id}
                image={`https://restaurant-api.dicoding.dev/images/medium/${el.pictureId}`}
                name={el.name}
                rating={el.rating}
              />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-8">
              {restaurants.slice(0, 8).map((el, idx) => (
                <Card
                  key={idx}
                  id={el.id}
                  image={`https://restaurant-api.dicoding.dev/images/medium/${el.pictureId}`}
                  name={el.name}
                  rating={el.rating}
                />
              ))}
            </div>
            <button
              className="border-2 border-gray-800 w-1/3 py-2 mx-auto"
              onClick={() => setLoadMore(true)}
            >
              Load More
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Main;
