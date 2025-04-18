import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Slide } from "react-awesome-reveal";
import supabase from "../../supabase-client";

const MyCraft = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [uiDelete, setUiDelete] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetching all art from Supabase
  useEffect(() => {
    const fetchMyArt = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("ArtList").select("*");

        if (error) {
          throw error;
        }

        setItems(data);
        setFilteredItems(data);
      } catch (err) {
        console.error("Error fetching My Art:", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load your artwork. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMyArt();
  }, [uiDelete]);

  // Delete function
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
        try {
          const { error } = await supabase
            .from("ArtList")
            .delete()
            .eq("id", id);

          if (error) throw error;

          Swal.fire("Deleted!", "Item has been deleted.", "success");
          setUiDelete((prev) => !prev);
        } catch (err) {
          console.error("Error deleting item:", err);
          Swal.fire({
            icon: "error",
            title: "Delete Failed",
            text: "Item could not be deleted. Please try again later.",
          });
        }
      }
    });
  };

  return (
    <Slide>
      <div>
        {loading ? (
          <div className="text-center py-20 text-gray-500 text-xl">
            Loading your artwork...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-xl">
            No artwork found. Start adding your creations!
          </div>
        ) : (
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
                      <p>₦{(item.price * 1000).toLocaleString()}</p>
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
                      <p>{item.stockStatus ? "Available" : "Out of Stock"}</p>
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
        )}
      </div>
    </Slide>
  );
};

export default MyCraft;
