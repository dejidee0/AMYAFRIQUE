// import { useContext } from "react";
// import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const AddCraft = () => {
  // const {user}= useContext(AuthContext)

  const handleAdd = (e) => {
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
    const email = form.email.value;
    const name = form.name.value;
    const image = form.photoUrl.value;
    const newArt = {
      item_name,
      subcategory_name,
      rating,
      short_description,
      price,
      customization,
      processing_time,
      stockStatus,
      email,
      name,
      image,
    };
    console.log(newArt);

    fetch("https://assignment-10-server-nu-ashen.vercel.app/arts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newArt),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        form.reset();
        if (data.insertedId) {
          Swal.fire({
            text: "Added item successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      });
  };
  return (
    <div>
      <div className="">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left"></div>
          <div className="card shrink-0 w-full shadow-2xl bg-base-100 border-2 border-[#eb9b40]">
            <form onSubmit={handleAdd} className="card-body">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
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
                      name="itemName"
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
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <p className="label-text font-semibold mt-2 ">
                      Subcategory Name
                    </p>
                    <label className="label">
                      <select name="subName" className="border-2 " required>
                        <option value=""></option>
                        <option value="Landscape Painting">
                          Landscape Painting
                        </option>
                        <option value="Portrait Drawing">
                          Portrait Drawing
                        </option>
                        <option value="Watercolor Painting">
                          Watercolor Painting
                        </option>
                        <option value="Oil Painting">Oil Painting</option>
                        <option value="Charcoal Sketching">
                          Charcoal Sketching
                        </option>
                        <option value="Cartoon Drawing">Cartoon Drawing</option>
                      </select>
                    </label>
                  </div>
                </div>
                {/* 2 */}
                <div>
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
                      className="input input-bordered"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        User Email
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="email"
                      name="email"
                      // defaultValue={user.email}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        User Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="name"
                      name="name"
                      // defaultValue={user.displayName}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <p className="label-text font-semibold mt-2 ">
                      Customization
                    </p>
                    <label className="label">
                      <select name="cust" className="border-2 " required>
                        <option value=""></option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </label>
                  </div>
                  <div className="form-control">
                    <p className="label-text font-semibold mt-2 ">
                      Stock Status
                    </p>
                    <label className="label">
                      <select name="status" className="border-2 " required>
                        <option value=""></option>
                        <option value="In stock">In stock</option>
                        <option value="Made to Order">Made to Order</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Image</span>
                </label>
                <input
                  type="text"
                  placeholder="photoUrl"
                  name="photoUrl"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn bg-purple-500 text-black">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCraft;
