import { useEffect, useState } from "react";
import { Slide } from "react-awesome-reveal";
import { Link, useLoaderData } from "react-router-dom";

const SubCategory = () => {
  const items = useLoaderData();
  console.log(items);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://assignment-10-server-nu-ashen.vercel.app/artSub/${items._id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
      });
  }, [items]);

  return (
    <div>
      <div className="flex flex-row justify-center items-center">
        {isLoading ? (
          <span className="loading loading-spinner loading-lg "></span>
        ) : null}
      </div>
      <Slide>
        <div>
          {items.map((item) => (
            <div key={item._id} className="mb-10">
              <div className="hero-content flex-col lg:flex-row justify-normal gap-32  border-2 border-[#eb9b40]">
                <img
                  src={item.image}
                  className=" rounded-lg shadow-2xl h-[300px] w-[400px]"
                />
                <div>
                  <h1 className="text-5xl font-bold ">{item.item_name}</h1>
                  <div className="py-2 flex flex-row gap-3">
                    <p className="font-bold">Category:</p>
                    <p>{item.subcategory_name}</p>
                  </div>
                  <div className="py-2 flex flex-row gap-3">
                    <p className="font-bold">Rating:</p>
                    <p>{item.rating}</p>
                  </div>
                  <div className="py-2 flex flex-row gap-3">
                    <p className="font-bold">Price:</p>

                    <p>{item.price}</p>
                  </div>
                  <div className="py-2 flex flex-row gap-3">
                    <p className="font-bold">Processing Time:</p>

                    <p>{item.processing_time}</p>
                  </div>
                  <div className="py-2 flex flex-row gap-3">
                    <p className="font-bold">Short Description:</p>

                    <p>{item.short_description}</p>
                  </div>

                  <Link to={`/view/${item._id}`}>
                    <button className="btn bg-purple-600 text-black">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Slide>
    </div>
  );
};

export default SubCategory;
