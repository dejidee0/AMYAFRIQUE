import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Slide } from "react-awesome-reveal";

const MyCraft = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [uiDelete, setUiDelete] = useState(false);

  useEffect(() => {
    fetch("https://assignment-10-server-nu-ashen.vercel.app/arts")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data);
      });
  }, [uiDelete]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure to delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://assignment-10-server-nu-ashen.vercel.app/deleteCraft/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Item has been deleted.",
                icon: "success",
              });
            }
            setUiDelete(!uiDelete);
          });
      }
    });
  };

  const handleFilter = (filter) => {
    if (filter === "Yes" || filter === "No") {
      setFilteredItems(items.filter((item) => item.customization === filter));
    } else {
      setFilteredItems(items);
    }
  };

  return (
    <Slide>
      <div>
        <div className="dropdown dropdown-right mb-10">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 bg-[#eb9b40] text-black"
          >
            Customization Filter
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li onClick={() => handleFilter("Yes")}>
              <a>Yes</a>
            </li>
            <li onClick={() => handleFilter("No")}>
              <a>No</a>
            </li>
          </ul>
        </div>
        <div>
          {filteredItems.map((item) => (
            <div key={item._id} className="mb-10">
              <div className="hero-content flex-col lg:flex-row justify-normal gap-20 rounded-3xl border-2 border-[#eb9b40]">
                <img
                  src={item.image}
                  className="rounded-lg shadow-2xl h-[300px] w-[400px]"
                />
                <div>
                  <h1 className="text-5xl font-bold">{item.item_name}</h1>
                  <div className="py-2 flex flex-row gap-3">
                    <p className="font-bold">Price:</p>
                    <p>{item.price}</p>
                  </div>
                  <div className="py-2 flex flex-row gap-3">
                    <p className="font-bold">Rating:</p>
                    <p>{item.rating}</p>
                  </div>
                  <div className="py-2 flex flex-row gap-3">
                    <p className="font-bold">Customization:</p>
                    <p>{item.customization}</p>
                  </div>
                  <div className="py-2 flex flex-row gap-3">
                    <p className="font-bold">StockStatus:</p>
                    <p>{item.stockStatus}</p>
                  </div>
                  <div className="flex flex-row gap-10">
                    <Link to={`/craftDe/${item._id}`}>
                      <button className="btn bg-[#eb9b40] text-black">
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn bg-[#eb9b40] text-black"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

export default MyCraft;
