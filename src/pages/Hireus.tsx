import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDb } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
const Hireus = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([
    {
      img: [],
      desc: "",
    },
  ]);
  const [bluePrint, setBluePrint] = useState("");

  console.log(data);

  const changeHandeler = (e, which) => {
    setData((prev) => {
      return prev.map((s, index) => {
        if (which === index) {
          return { ...s, desc: e.target.value };
        } else {
          return s;
        }
      });
    });
  };
  const fileHandeler = (e, which, specific) => {
    let temp = [...data[which].img];
    temp[specific] = e.target.files[0];

    setData((prev) => {
      return prev.map((s, index) => {
        if (which === index) {
          return { ...s, img: temp };
        } else {
          return s;
        }
      });
    });
  };
  const submitHandeler = async (e) => {
    e.preventDefault();
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    try {
      setIsLoading(true);
      const temp = await Promise.all(
        data.map(async (s) => {
          return {
            imgurl: await Promise.all(
              s.img.map(async (k) => {
                const imgref = ref(imageDb, `files/${uuidv4()}`);
                await uploadBytes(imgref, k);
                const url = await getDownloadURL(imgref);
                return url;
              })
            ),
            description: s.desc,
          };
        })
      );
      console.log(temp);
      const imgref = ref(imageDb, `files/${uuidv4()}`);
      await uploadBytes(imgref, bluePrint);
      const blueprintURL = await getDownloadURL(imgref);
      const res = await instance.post("/upload", {
        roomcount: data.length,
        rooms: [...temp],
        blueprintURL,
      });
      toast.success("Submitted Sucessfully");
      setIsLoading(false);
      navigate("/my-sub");
      console.log(res);
    } catch (err) {
      setIsLoading(false);
      toast.error("Something went wrong");

      console.log(err);
    }
  };
  return (
    <div className="flex justify-center ">
      <form className=" w-1/2 " onSubmit={submitHandeler}>
        <h1 className="font-bold text-lg  my-4 text-center">
          Upload Blue Print
        </h1>
        <input
          type="file"
          id="avatar"
          name="avatar"
          required
          onChange={(e) => {
            setBluePrint(e.target.files[0]);
          }}
          accept="image/png,image/jpeg"
          className="file-input file-input-sm file-input-bordered file-input-primary w-full max-w-xs  "
        />

        <h1 className="font-bold text-lg  my-4 text-center">Rooms</h1>
        {data.map((s, index) => {
          return (
            <div key={index}>
              <h1 className="font-bold text-lg  my-4">Images</h1>
              <div className="flex justify-between">
                <input
                  onChange={(e) => {
                    fileHandeler(e, index, 0);
                  }}
                  type="file"
                  id="avatar"
                  name="avatar"
                  required
                  accept="image/png,image/jpeg"
                  className="file-input file-input-sm file-input-bordered file-input-primary w-full max-w-xs"
                />{" "}
                <input
                  onChange={(e) => {
                    fileHandeler(e, index, 1);
                  }}
                  type="file"
                  id="avatar"
                  name="avatar"
                  required
                  accept="image/png,image/jpeg"
                  className="file-input file-input-sm file-input-bordered file-input-primary w-full max-w-xs"
                />
              </div>
              <h1 className="font-bold text-lg  my-4">Description</h1>

              <textarea
                name="desc"
                required
                onChange={(e) => {
                  changeHandeler(e, index);
                }}
                className="w-full h-16 border-2 border-slate-400 resize-none"
              />
            </div>
          );
        })}
        <button
          type="button"
          className="btn btn-secondary btn-sm my-4"
          onClick={() => {
            setData((prev) => {
              return [
                ...prev,
                {
                  img: [],
                  desc: "",
                },
              ];
            });
          }}
        >
          Add Another Room
        </button>
        <div className="flex justify-end">
          {isLoading ? (
            <button className="btn">
              <span className="loading loading-spinner">Loading</span>
            </button>
          ) : (
            <button className="btn btn-primary btn-sm">Submit</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Hireus;
