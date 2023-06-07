import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/card";
import Header from "../components/header";

const Main = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [showedRestaurants, setShowedRestaurants] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [price, setPrice] = useState(0);
  const [open, setOpen] = useState(null);
  const [category, setCategory] = useState(null);

  const headerContent = {
    title: "Restaurants",
    content: `The ultimate guide to exploring and discovering the finest restaurants 
    in your area. With a vast collection of restaurants at your fingertips, this app 
    is designed to make your dining experiences exceptional.`,
  };

  const resetFilter = () => {
    setPrice(0);
    setOpen(false);
    setCategory(null);
    setShowedRestaurants(restaurants);
  };

  useEffect(() => {
    let filteredRestaurants = restaurants;

    if (filteredRestaurants.length > 0 && price !== 0) {
      if (price === "1") {
        filteredRestaurants = filteredRestaurants.filter((restaurant) => {
          return restaurant.price === 1;
        });
      } else if (price === "2") {
        filteredRestaurants = filteredRestaurants.filter((restaurant) => {
          return restaurant.price === 2;
        });
      } else if (price === "3") {
        filteredRestaurants = filteredRestaurants.filter((restaurant) => {
          return restaurant.price === 3;
        });
      }
    }

    if (open) {
      if (filteredRestaurants.length > 0) {
        filteredRestaurants = filteredRestaurants.filter((restaurant) => {
          return restaurant.open;
        });
      }
    }

    setShowedRestaurants(filteredRestaurants);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, price]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/list`)
      .then((response) => {
        if (response.data.restaurants) {
          response.data.restaurants.forEach((el) => {
            // Set dummy price
            if (el.rating === 5) {
              el.price = 3;
            } else if (el.rating > 4) {
              el.price = 2;
            } else {
              el.price = 1;
            }

            // Set dummy open
            if (Math.random() > 0.5) {
              el.open = true;
            } else {
              el.open = false;
            }
          });
        }
        setRestaurants(response.data.restaurants);
        setShowedRestaurants(response.data.restaurants);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Header title={headerContent.title} content={headerContent.content} />
      <div className="flex flex-row border-t-2 border-b-2 py-3 px-8">
        <div className="flex flex-row gap-6 items-center">
          <span>Filter By:</span>
          <div className="flex flex-row items-center gap-2 border-b-2">
            <input
              type="checkbox"
              checked={open}
              onChange={(e) => setOpen(e.target.checked)}
            />
            <span>Open Now</span>
          </div>
          <div>
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="min-w-[6rem] border-b-2"
            >
              <option value="">Price</option>
              <option value={1}>$</option>
              <option value={2}>$$</option>
              <option value={3}>$$$</option>
            </select>
          </div>
          <div></div>
        </div>
        <div className="ml-auto">
          <button className="p-2 border-2" onClick={() => resetFilter()}>
            Clear All
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl">All Restaurants</h1>
        {loadMore || showedRestaurants.length <= 8 ? (
          <div className="grid grid-cols-4 gap-8">
            {showedRestaurants.map((el, idx) => (
              <Card
                key={idx}
                id={el.id}
                image={`https://restaurant-api.dicoding.dev/images/medium/${el.pictureId}`}
                name={el.name}
                rating={el.rating}
                open={el.open}
                price={el.price}
              />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-8">
              {showedRestaurants.slice(0, 8).map((el, idx) => (
                <Card
                  key={idx}
                  id={el.id}
                  image={`https://restaurant-api.dicoding.dev/images/medium/${el.pictureId}`}
                  name={el.name}
                  rating={el.rating}
                  open={el.open}
                  price={el.price}
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
