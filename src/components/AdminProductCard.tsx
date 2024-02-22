import { useState } from "react";
import axios from "axios";
import AdminEditProduct from "./AdminEditProduct";
const AdminProductCard = ({ name, price, desc, id, refetch, all, img_url }) => {
  const [editItem, setEditItem] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex flex-wrap p-8 justify-center">
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl text-secondary">Delete {name} ?</h3>
          <div className="flex place-content-between mt-4">
            {isLoading ? (
              <button className="btn">
                <span className="loading loading-spinner"></span>
                loading
              </button>
            ) : (
              <button
                className="btn bg-secondary"
                onClick={async () => {
                  setIsLoading(true);
                  const instance = axios.create({
                    withCredentials: true,
                    headers: { authorization: "Bearer" },
                  });
                  try {
                    const res = await instance.delete(`admin/product/` + id);
                    refetch();
                    setIsLoading(false);
                    return res.data;
                  } catch (err) {
                    console.log(err);
                    return err;
                  }
                }}
              >
                Delete
              </button>
            )}

            <button className="btn bg-primary">Cancel</button>
          </div>
        </div>
        {/* <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form> */}
      </dialog>

      {editItem == id && (
        <AdminEditProduct
          refetch={refetch}
          product={all}
          setEditItem={setEditItem}
          editItem={editItem}
        />
      )}

      <div className="card card-compact w-72 bg-base-100 shadow-xl">
        <figure>
          <img src={img_url} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h3 className="card-title ">{name}</h3>
          <p className="text-sm">{desc}</p>
          <p className="font-medium">Nrs. {price}</p>
          <div className="card-actions justify-end">
            <button
              onClick={() => setEditItem(id)}
              className="btn btn-primary btn-sm"
            >
              Edit
            </button>{" "}
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;
