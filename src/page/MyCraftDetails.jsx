import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import supabase from "../../supabase-client";

const MyCraftDetails = () => {
  const { id } = useParams();
  const [craft, setCraft] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchCraftDetails = async () => {
      const { data, error } = await supabase
        .from("ArtList")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching craft details:", error);
      } else {
        setCraft(data);

        setImagePreview(data.image); // Set existing image as preview
      }
    };

    fetchCraftDetails();
  }, [id]);

  // Handle image file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file)); // Show preview before upload
  };

  // Handle form submission (update)
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const updatedCraft = {
      item_name: form.itemName.value,
      subcategory_name: form.subName.value,
      short_description: form.shortDes.value,
      price: form.price.value,
      year: form.status.year,
      artist: form.status.value,
    };

    // Upload image if a new one is selected
    if (imageFile) {
      try {
        const fileName = `${Date.now()}-${imageFile.name}`;
        const { error } = await supabase.storage
          .from("art-images")
          .upload(fileName, imageFile, {
            cacheControl: "3600",
            upsert: false,
            contentType: imageFile.type,
          });

        if (error) throw error;

        // Get the public URL
        const { data: imageData } = supabase.storage
          .from("art-images")
          .getPublicUrl(fileName);
        updatedCraft.image = imageData.publicUrl;
      } catch (error) {
        Swal.fire({
          text: "Image upload failed",
          icon: "error",
          confirmButtonText: "Ok",
        });
        console.error(error);
        setLoading(false);
        return;
      }
    }

    // Update the record in Supabase
    const { error } = await supabase
      .from("ArtList")
      .update(updatedCraft)
      .eq("id", id);

    if (error) {
      Swal.fire({
        text: "Failed to update item",
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.error(error);
    } else {
      Swal.fire({
        text: "Updated item successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full shadow-2xl bg-base-100 border-2 border-[#eb9b40]">
          <form onSubmit={handleUpdate} className="card-body">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Left Side */}
              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Item Name</span>
                  </label>
                  <input
                    type="text"
                    name="itemName"
                    defaultValue={craft.title}
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Category</span>
                  </label>
                  <input
                    type="text"
                    name="subName"
                    defaultValue={craft.category}
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Description
                    </span>
                  </label>
                  <input
                    type="text"
                    name="shortDes"
                    defaultValue={craft.description}
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>

              {/* Right Side */}
              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Artist</span>
                  </label>
                  <input
                    type="text"
                    name="status"
                    defaultValue={craft.artist}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Year</span>
                  </label>
                  <input
                    type="text"
                    name="status"
                    defaultValue={craft.year}
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Price</span>
                  </label>
                  <input
                    type="text"
                    name="price"
                    defaultValue={craft.price}
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Upload Image</span>
              </label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                onChange={handleFileChange}
              />
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">Image Preview:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-96 object-cover rounded-lg border-2 mt-2"
                />
              </div>
            )}

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn bg-[#eb9b40] text-black"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyCraftDetails;
