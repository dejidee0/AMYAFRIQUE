import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Slide } from "react-awesome-reveal";
import supabase from "../../supabase-client";

const MyCraft = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [uiDelete, setUiDelete] = useState(false);

  // Fetching all art from Supabase
  useEffect(() => {
    const fetchMyArt = async () => {
      const { data, error } = await supabase.from("ArtList").select("*");

      if (error) {
        console.error("Error fetching My Art: ", error);
      } else {
        setItems(data);
        setFilteredItems(data); // Initially, show all items
      }
    };

    fetchMyArt();
  }, [uiDelete]); // Re-run when an item is deleted

  // Delete function (using Supabase)
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await supabase.from("ArtList").delete().eq("id", id);

        if (error) {
          console.error("Error deleting item: ", error);
          Swal.fire("Error!", "Item could not be deleted.", "error");
        } else {
          Swal.fire("Deleted!", "Item has been deleted.", "success");
          setUiDelete(!uiDelete); // Trigger UI update
        }
      }
    });
  };

  return (
    <Slide>
      <div>
        {/* Display Art Items */}
        <div>
          {filteredItems.map((item) => (
            <div key={item.id} className="mb-10">
              <div className="hero-content flex-col lg:flex-row justify-normal gap-10 rounded-3xl border-2 border-[#eb9b40] p-5">
                <div className="w-full lg:w-1/2">
                  <img
                    src={item.image}
                    className="rounded-lg shadow-2xl w-max max-h-[500px] object-contain"
                    alt={item.title}
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <h1 className="text-5xl font-bold">{item.title}</h1>
                  <div className="py-2 flex flex-row gap-3">
                    <p className="font-bold">Price:</p>
                    <p>{item.price}</p>
                  </div>
                  <div className="py-2 flex flex-row gap-3">
                    <p className="font-bold">Artist:</p>
                    <p>{item.artist}</p>
                  </div>
                  <div className="py-2 flex flex-row gap-3">
                    <p className="font-bold">Year:</p>
                    <p>{item.year}</p>
                  </div>
                  <div className="py-2 flex flex-row gap-3">
                    <p className="font-bold">Stock Status:</p>
                    <p>{item.stockStatus && <p>Availale</p>}</p>
                  </div>
                  <div className="flex flex-row gap-10">
                    <Link to={`/craftDe/${item.id}`}>
                      <button className="btn bg-[#eb9b40] text-black">
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
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
