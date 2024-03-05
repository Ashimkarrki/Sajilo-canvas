import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDb } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Hireus = () => {
  const [totalRoom, setTotalRoom] = useState(1);
  const p = useLocation();

  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([
    {
      img: [],
      desc: "",
    },
  ]);
  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("totalRoom"));

    if (temp) {
      setTotalRoom(temp);
      for (let i = 0; i < temp - 1; i++) {
        setData((prev) => {
          return [
            ...prev,
            {
              img: [],
              desc: "",
            },
          ];
        });
      }
    }
  }, []);
  const [bluePrint, setBluePrint] = useState("");
  const onPayment = async () => {
    if (totalRoom <= 0) {
      toast.error("Must Be Greater Than 0");
      return;
    }
    const payload = {
      return_url: "http://localhost:5173/hireus",
      website_url: "http://localhost:5173",
      amount: totalRoom * 1000 > 1000 ? 100000 : totalRoom * 1000 * 100,
      purchase_order_id: uuidv4(),
      purchase_order_name: "Designing",
      customer_info: {
        name: "Ashim Upadhaya",
        email: "example@gmail.com",
        phone: "9811496763",
      },
    };
    console.log(payload);

    try {
      const res = await instance.post("/payment", payload);
      localStorage.setItem("totalRoom", JSON.stringify(totalRoom));
      window.location.href = `${res?.data?.data?.payment_url}`;
    } catch (err) {
      console.log(err);
    }
  };
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
      const khaltiRes = await instance.post("/payment/confirm", {
        pidx: p.search.split("=")[1].split("&")[0],
      });
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
      localStorage.removeItem("totalRoom");
      navigate("/my-sub", { replace: true });
    } catch (err) {
      setIsLoading(false);
      toast.error("Something went wrong");

      console.log(err);
    }
  };
  return (
    <div className="flex justify-center ">
      {p?.search ? (
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
                  value={data[index].desc}
                  onChange={(e) => {
                    changeHandeler(e, index);
                  }}
                  className="w-full h-16 border-2 border-slate-400 resize-none"
                />
              </div>
            );
          })}
          {/* <button
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
          </button> */}

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
      ) : (
        <div>
          <input
            type="number"
            value={totalRoom}
            className=" [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-2 w-20 px-1 rounded-md input input-bordered input-sm mt-4"
            onChange={(e) => {
              setTotalRoom(e.target.value);
            }}
          />
          <button
            type="button"
            className="btn btn-primary btn-sm ml-4"
            onClick={onPayment}
          >
            Pay
          </button>
        </div>
      )}
    </div>
  );
};

export default Hireus;
