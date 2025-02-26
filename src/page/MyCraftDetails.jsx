import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const MyCraftDetails = () => {
  const { id } = useParams();
  const [crafts, setCrafts] = useState({});
  useEffect(() => {
    fetch(`https://assignment-10-server-nu-ashen.vercel.app/craftDetails/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCrafts(data);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const item_name = form.itemName.value;
    const subcategory_name = form.subName.value;
    const rating = form.rating.value;
    const short_description = form.shortDes.value;
    const price = form.price.value;
    const customization = form.cust.value;
    const processing_time = form.process.value;
    const stockStatus = form.status.value;
    const image = form.photoUrl.value;
    const newCraft = {
      item_name,
      subcategory_name,
      rating,
      short_description,
      price,
      customization,
      processing_time,
      stockStatus,
      image,
    };
    console.log(newCraft);

    fetch(
      `https://assignment-10-server-nu-ashen.vercel.app/updateCraft/${id}`,
      {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newCraft),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          Swal.fire({
            text: "Updated item successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      });
  };
  console.log(id);
  return (
    <div>
      <div className="">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left"></div>
          <div className="card shrink-0 w-full shadow-2xl bg-base-100 border-2 border-[#eb9b40]">
            <form onSubmit={handleUpdate} className="card-body">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* 1 */}
                <div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Item_Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Item_name"
                      defaultValue={crafts.item_name}
                      name="itemName"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Subcategory_Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="subcategory_name"
                      defaultValue={crafts.subcategory_name}
                      name="subName"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Rating</span>
                    </label>
                    <input
                      type="text"
                      placeholder="rating"
                      name="rating"
                      defaultValue={crafts.rating}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Short Description
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="short description"
                      name="shortDes"
                      defaultValue={crafts.short_description}
                      className="input input-bordered"
                      required
                    />
                  </div>
                </div>
                {/* 2 */}
                <div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold ">
                        Customization
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="customization"
                      name="cust"
                      defaultValue={crafts.customization}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Processing_time
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="processing_time"
                      name="process"
                      defaultValue={crafts.processing_time}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        StockStatus
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="StockStatus"
                      name="status"
                      defaultValue={crafts.stockStatus}
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
                      placeholder="price"
                      name="price"
                      defaultValue={crafts.price}
                      className="input input-bordered"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image</span>
                </label>
                <input
                  type="text"
                  placeholder="photoUrl"
                  defaultValue={crafts.image}
                  name="photoUrl"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn bg-[#eb9b40] text-black">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCraftDetails;
