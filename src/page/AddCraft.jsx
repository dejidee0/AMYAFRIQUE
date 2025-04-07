import { useState } from "react";
import Swal from "sweetalert2";
import supabase from "../../supabase-client";
const AddCraft = () => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file)); // Show preview before upload
  };

  // Handle Form Submission
  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    const artist = form.artist.value;
    const year = form.year.value;

    // Ensure an image is selected
    if (!imageFile) {
      Swal.fire({
        text: "Please select an image",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      setLoading(false);
      return;
    }

    let imageUrl = "";
    try {
      const fileName = `${Date.now()}-${imageFile.name}`;
      const { error } = await supabase.storage
        .from("art-images")
        .upload(fileName, imageFile, {
          cacheControl: "3600",
          upsert: false, // Prevent overwriting existing files
          contentType: imageFile.type, // Ensure correct file type
        });

      if (error) throw error;

      // Get Public URL
      const { data: imageData } = supabase.storage
        .from("art-images")
        .getPublicUrl(fileName);
      imageUrl = imageData.publicUrl;
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

    const newArt = {
      title,
      description,
      category,
      image: imageUrl,
      artist,
      year,
    };

    // Insert into Supabase
    const { error } = await supabase.from("ArtList").insert([newArt]);

    if (error) {
      Swal.fire({
        text: "Failed to add item",
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.error(error);
    } else {
      Swal.fire({
        text: "Added item successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
      form.reset();
      setImageFile(null);
      setImagePreview(null);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full shadow-2xl bg-base-100 border-2 border-[#eb9b40]">
          <form onSubmit={handleAdd} className="card-body">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Left Side */}
              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Title</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
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
                    name="description"
                    placeholder="Description"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Category</span>
                  </label>
                  <select
                    name="category"
                    className="border-2 input-bordered w-full p-2"
                    required
                  >
                    <option value=""></option>
                    <option value="Landscape Painting">
                      Landscape Painting
                    </option>
                    <option value="Portrait Drawing">Portrait Drawing</option>
                    <option value="Watercolor Painting">
                      Watercolor Painting
                    </option>
                    <option value="Oil Painting">Oil Painting</option>
                    <option value="Charcoal Sketching">
                      Charcoal Sketching
                    </option>
                    <option value="Cartoon Drawing">Cartoon Drawing</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Price</span>
                  </label>
                  <input
                    type="text"
                    name="price"
                    placeholder="Price"
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
                    name="artist"
                    placeholder="Artist"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Year</span>
                  </label>
                  <input
                    type="number"
                    name="year"
                    placeholder="Year"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Upload Image
                    </span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full"
                    onChange={handleFileChange}
                    required
                  />
                </div>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">Image Preview:</p>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-lg border-2 mt-2"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn bg-purple-500 text-black"
                disabled={loading}
              >
                {loading ? "Uploading & Adding..." : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCraft;
