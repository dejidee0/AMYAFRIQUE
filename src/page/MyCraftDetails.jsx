import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import supabase from "../../supabase-client";

const MyCraftDetails = () => {
  const { id } = useParams();
  const [craft, setCraft] = useState({
    title: "",
    description: "",
    price: "",
    year: "",
    artist: "",
    image: "",
    qrCode: "", // Added qrCode state for the QR code image
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageFile2, setImageFile2] = useState(null); // Image file for QR code
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null); // Preview for QR code

  useEffect(() => {
    const fetchCraftDetails = async () => {
      const { data, error } = await supabase
        .from("ArtList")
        .select("*")
        .eq("id", parseInt(id))
        .single();

      if (error) {
        console.error("Error fetching craft details:", error);
      } else {
        setCraft({
          title: data.title || "",
          description: data.description || "",
          price: data.price || "",
          year: data.year || "",
          artist: data.artist || "",
          image: data.image || "",
          qrCode: data.qrCode || "", // Fetch the QR code image URL
        });
        setImagePreview(data.image);
        setImagePreview2(data.qrCode); // Set the preview for QR code
      }
    };

    fetchCraftDetails();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleFileChange2 = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile2(file);
    setImagePreview2(URL.createObjectURL(file)); // Set QR code preview
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCraft((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedCraft = {
      ...craft,
      price: parseFloat(craft.price),
      year: parseInt(craft.year, 10),
    };

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

        const { data: imageData } = supabase.storage
          .from("art-images")
          .getPublicUrl(fileName);

        updatedCraft.image = imageData.publicUrl;
      } catch (error) {
        Swal.fire("Image upload failed", "", "error");
        console.error(error);
        setLoading(false);
        return;
      }
    }

    if (imageFile2) {
      // Upload QR code if selected
      try {
        const qrCodeFileName = `${Date.now()}-${imageFile2.name}`;
        const { error } = await supabase.storage
          .from("qr-codes")
          .upload(qrCodeFileName, imageFile2, {
            cacheControl: "3600",
            upsert: false,
            contentType: imageFile2.type,
          });

        if (error) throw error;

        const { data: qrCodeData } = supabase.storage
          .from("qr-codes")
          .getPublicUrl(qrCodeFileName);

        updatedCraft.qrCode = qrCodeData.publicUrl; // Save QR code URL
      } catch (error) {
        Swal.fire("QR code upload failed", "", "error");
        console.error(error);
        setLoading(false);
        return;
      }
    }

    const craftId = parseInt(id, 10);
    const { data: existingData, error: selectError } = await supabase
      .from("ArtList")
      .select("*")
      .eq("id", craftId);

    if (selectError || !existingData?.length) {
      Swal.fire("Error fetching item", "", "error");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("ArtList")
      .update(updatedCraft)
      .eq("id", craftId)
      .select();

    if (error) {
      Swal.fire("Update failed", error.message, "error");
    } else {
      Swal.fire("Updated!", "Item updated successfully", "success");
      console.log("Updated data:", data);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full shadow-2xl bg-base-100 border-2 border-[#eb9b40]">
          <form onSubmit={handleUpdate} className="card-body">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Title</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={craft.title}
                    onChange={handleChange}
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
                    value={craft.description}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Artist</span>
                  </label>
                  <input
                    type="text"
                    name="artist"
                    value={craft.artist}
                    onChange={handleChange}
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
                    value={craft.year}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Price</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={craft.price}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Update Image</span>
              </label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                onChange={handleFileChange}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Update QR Code</span>
              </label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                onChange={handleFileChange2}
              />
            </div>

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

            {imagePreview2 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">QR Code Preview:</p>
                <img
                  src={imagePreview2}
                  alt="QR Code Preview"
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
