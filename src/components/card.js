import { Link } from "react-router-dom";
import ReactStars from "react-stars";

const Card = ({ id, image, name, rating, open, price }) => {
  return (
    <>
      <div className="flex flex-col">
        <img alt="restaurant" src={image} className="h-[12rem]" />
        <h2 className="font-semibold text-lg mt-2">{name}</h2>
        <ReactStars
          count={5}
          value={rating}
          edit={false}
          color2={"rgb(31 41 55)"}
          size={20}
          className="p-0"
        />
        <div className="flex flex-row">
          <div className="flex flex-row">
            <span>Kategori</span>
            <span className="mx-2">&#8226;</span>
            <span>{"$".repeat(price)}</span>
          </div>
          <div className="ml-auto">
            {open ? (
              <>
                <span className="text-[green] mr-1">&#8226;</span>Open Now
              </>
            ) : (
              <>
                <span className="text-[red] mr-1">&#8226;</span>Closed
              </>
            )}
          </div>
        </div>
        <Link
          className="w-full bg-gray-800 text-white p-2 mt-4 text-center"
          to={`/restaurants/${id}`}
        >
          LEARN MORE
        </Link>
      </div>
    </>
  );
};

export default Card;
