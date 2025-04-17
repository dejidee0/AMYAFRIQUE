import { useState } from "react";
import Swal from "sweetalert2";
import supabase from "../../supabase-client";

const AddCraft = () => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [qrFile, setQrFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [qrPreview, setQrPreview] = useState(null);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "image") {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setQrFile(file);
      setQrPreview(URL.createObjectURL(file));
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const price = parseFloat(form.price.value) / 1000;

    const artist = form.artist.value;
    const year = form.year.value;
    const stockStatus = true;

    if (!imageFile || !qrFile) {
      Swal.fire({
        text: "Please select both art image and QR code image",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      setLoading(false);
      return;
    }

    // Upload image and qr
    let imageUrl = "";
    let qrUrl = "";

    try {
      const uploadFile = async (file, folder = "art-images") => {
        const fileName = `${Date.now()}-${file.name}`;
        const { error } = await supabase.storage
          .from(folder)
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
          });

        if (error) throw error;

        const { data } = supabase.storage.from(folder).getPublicUrl(fileName);
        return data.publicUrl;
      };

      imageUrl = await uploadFile(imageFile);
      qrUrl = await uploadFile(qrFile);
    } catch (error) {
      Swal.fire({
        text: "Image or QR code upload failed",
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.error(error);
      setLoading(false);
      return;
    }

    const newArt = {
      title,
      stockStatus,
      description,
      price,
      image: imageUrl,
      qrCode: qrUrl,
      artist,
      year,
    };

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
      setQrFile(null);
      setImagePreview(null);
      setQrPreview(null);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full shadow-2xl bg-base-100 border-2 border-[#eb9b40]">
          <form onSubmit={handleAdd} className="card-body">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Left */}
              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Title</span>
                  </label>
                  <input
                    type="text"
                    name="title"
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
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Upload QR Code
                    </span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full"
                    onChange={(e) => handleFileChange(e, "qr")}
                    required
                  />
                  {qrPreview && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">QR Preview:</p>
                      <img
                        src={qrPreview}
                        alt="QR Preview"
                        className="w-full h-32 object-contain mt-2"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Right */}
              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Artist</span>
                  </label>
                  <input
                    type="text"
                    name="artist"
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
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Upload Art Image
                    </span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full"
                    onChange={(e) => handleFileChange(e, "image")}
                    required
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Image Preview:</p>
                      <img
                        src={imagePreview}
                        alt="Image Preview"
                        className="w-full h-40 object-cover mt-2"
                      />
                    </div>
                  )}
                </div>
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
