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
    qrCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [qrCodeFile, setQrCodeFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [qrCodePreview, setQrCodePreview] = useState(null);

  useEffect(() => {
    const fetchCraft = async () => {
      const { data, error } = await supabase
        .from("ArtList")
        .select("*")
        .eq("id", parseInt(id))
        .single();

      if (error) {
        console.error("Error fetching craft details:", error);
        return;
      }

      setCraft(data);
      setImagePreview(data.image);
      setQrCodePreview(data.qrCode);
    };

    fetchCraft();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCraft((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (setter, previewSetter) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setter(file);
    previewSetter(URL.createObjectURL(file));
  };

  const uploadImage = async (file, bucket) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (error) throw error;

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedData = {
      ...craft,
      price: parseFloat(craft.price),
      year: parseInt(craft.year, 10),
    };

    try {
      if (imageFile) {
        updatedData.image = await uploadImage(imageFile, "art-images");
      }

      if (qrCodeFile) {
        updatedData.qrCode = await uploadImage(qrCodeFile, "qr-codes");
      }

      const { data, error } = await supabase
        .from("ArtList")
        .update(updatedData)
        .eq("id", parseInt(id))
        .select();

      if (error) throw error;

      Swal.fire("Updated!", "Item updated successfully", "success");
      console.log("Updated data:", data);
    } catch (error) {
      Swal.fire("Update failed", error.message, "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="card shrink-0 w-full shadow-2xl bg-base-100 border-2 border-[#eb9b40]">
        <form onSubmit={handleUpdate} className="card-body">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <InputField
                label="Title"
                name="title"
                value={craft.title}
                onChange={handleChange}
              />
              <InputField
                label="Description"
                name="description"
                value={craft.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <InputField
                label="Artist"
                name="artist"
                value={craft.artist}
                onChange={handleChange}
              />
              <InputField
                label="Year"
                name="year"
                type="number"
                value={craft.year}
                onChange={handleChange}
              />
              <InputField
                label="Price"
                name="price"
                type="number"
                value={craft.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <FileInput
            label="Update Image"
            onChange={handleFileChange(setImageFile, setImagePreview)}
          />
          <FileInput
            label="Update QR Code"
            onChange={handleFileChange(setQrCodeFile, setQrCodePreview)}
          />

          {imagePreview && (
            <ImagePreview label="Image Preview" src={imagePreview} />
          )}
          {qrCodePreview && (
            <ImagePreview label="QR Code Preview" src={qrCodePreview} />
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
  );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text font-semibold">{label}</span>
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="input input-bordered"
      required
    />
  </div>
);

const FileInput = ({ label, onChange }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text font-semibold">{label}</span>
    </label>
    <input
      type="file"
      accept="image/*"
      className="file-input file-input-bordered w-full"
      onChange={onChange}
    />
  </div>
);

const ImagePreview = ({ label, src }) => (
  <div className="mt-4">
    <p className="text-sm text-gray-600">{label}:</p>
    <img
      src={src}
      alt={label}
      className="w-full h-96 object-cover rounded-lg border-2 mt-2"
    />
  </div>
);

export default MyCraftDetails;
