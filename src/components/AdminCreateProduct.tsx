import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import styles from "../styles/EditProductPopUp.module.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDb } from "../firebase/firebaseConfig";
const AdminCreateProduct = ({ setCreation, refetch }) => {
  const [onlyFeatures, setOnlyFeatures] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const [data, setData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
    features: [],
    img_url: "",
  });
  console.log(data);
  const [files, setFiles] = useState({
    MainImage: "",
  });

  const onChangeState = (e) => {
    console.log(data.MainImage);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const onFileChange = (e) => {
    setFiles({
      ...files,
      [e.target.name]: e.target.files[0],
    });
  };
  return (
    <div
      className={styles.edit_product_wrapper}
      onClick={() => {
        setCreation(false);
      }}
    >
      <form
        className={styles.edit_product}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={async (e) => {
          let temp = data;
          e.preventDefault();
          setIsLoading(true);

          const imgref = ref(imageDb, `files/${uuidv4()}`);
          await uploadBytes(imgref, files.MainImage);
          const url = await getDownloadURL(imgref);
          temp = { ...temp, img_url: url };
          const res = await instance.post("admin/product/", temp);
          console.log(res.data);
          setIsLoading(false);
          setCreation(false);
          refetch();
          //          if (files.MainImage) {

          //   await uploadBytes(imgref, files.MainImage).then(() => {
          //     getDownloadURL(imgref).then((url) => {
          //       temp = { ...data, img_url: url };
          //       instance
          //         .put("admin/product/" + editItem, temp)
          //         .then((res) => {
          //           console.log(res.data);
          //           setIsLoading(false);
          //           setEditItem("");
          //           refetch();
          //         })
          //         .catch((err) => {
          //           console.log(err);
          //         });
          //     });
          //   });
          // }
        }}
      >
        <div className={styles.half}>
          <div>
            <h4 className={styles.heading}>Name </h4>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={data.name}
              required
              onChange={onChangeState}
            />
          </div>
          <div>
            <h4 className={styles.heading}>Price </h4>
            <input
              className={styles.input}
              type="number"
              name="price"
              value={data.price}
              required
              onChange={onChangeState}
            />
          </div>
        </div>

        <div className={styles.half}>
          <div>
            <h4 className={styles.heading}>Stock </h4>
            <input
              className={styles.input}
              type="number"
              name="quantity"
              value={data.quantity}
              required
              onChange={onChangeState}
            />
          </div>
        </div>
        <div className={styles.half}>
          <div>
            <h4 className={styles.heading}>Category</h4>
            <select
              className={styles.input}
              name="category"
              required
              onChange={onChangeState}
              value={data.category}
              // className={styles.select}
            >
              {/* values:['Furniture','Kitchen','Bathroom','Decor'] */}
              <option value={""}>-Select An Option- </option>
              <option value={"Furniture"}>Furniture</option>
              <option value={"Kitchen"}>Kitchen</option>
              <option value={"Bathroom"}>Bathroom</option>
              <option value={"Decor"}>Decor</option>
            </select>
          </div>
        </div>
        <div className={styles.half}>
          <div>
            <h4 className={styles.heading}>Main Image</h4>
            <input
              type="file"
              required
              name="MainImage"
              accept="image/png, image/jpeg"
              onChange={onFileChange}
              className={styles.filebutton}
            />
          </div>
        </div>
        <div>
          <h4 className={styles.heading}>Description</h4>
          <textarea
            name="description"
            className={`${styles.input} ${styles.text_area}`}
            value={data.description}
            onChange={onChangeState}
            rows={6}
          />
        </div>
        <div>
          <h4 className={styles.heading}>Features</h4>

          {data.features?.map((s, index) => {
            return (
              <input
                key={index}
                required
                type="text"
                value={s}
                style={{ marginBottom: "1rem" }}
                className={styles.input}
                onChange={(e) => {
                  setData((prev) => {
                    let temp = [...prev.features];
                    temp[index] = e.target.value;

                    return { ...prev, features: temp };
                  });
                }}
              />
            );
          })}
          <button
            type="button"
            className={"btn btn-sm"}
            onClick={() => {
              setData((prev) => {
                return { ...prev, features: [...prev.features, ""] };
              });
            }}
          >
            Add New Feature
          </button>
        </div>
        <div className={styles.buttonwrapper}>
          {isLoading ? (
            <button className="btn btn-square">
              <span className="loading loading-spinner"></span>
            </button>
          ) : (
            <button type="submit" className={styles.submit}>
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminCreateProduct;
