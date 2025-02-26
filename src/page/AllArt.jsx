import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

import { Slide } from "react-awesome-reveal";

const AllArt = () => {
  const loadedData = useLoaderData();
  const [allItems] = useState(loadedData);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://assignment-10-server-nu-ashen.vercel.app/arts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-center items-center">
        {isLoading ? (
          <span className="loading loading-spinner loading-lg "></span>
        ) : null}
      </div>
      <Slide>
        <div>
          <div className="lg:overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="lg:text-xl text-purple-500">
                  <th>Item Name</th>
                  <th>Subcategory Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {allItems.map((item) => (
                  <tr key={item._id} className="hover">
                    <td>{item.item_name}</td>
                    <td>{item.subcategory_name}</td>
                    <td>{item.price}</td>
                    <td>
                      <Link to={`/view/${item._id}`}>
                        <button className="lg:btn md:btn bg-[#eb9b40] lg:bg-[#eb9b40] md:bg-[#eb9b40] text-black lg:text-black md:text-black p-1 ">
                          View Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default AllArt;
