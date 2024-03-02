import axios from "axios";
import React from "react";
import { v4 as uuidv4 } from "uuid";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDb } from "../firebase/firebaseConfig";
import { useState } from "react";
const RequestsComponent = ({ data, refetch }) => {
  const [files, setFiles] = useState([]);
  const changeArray = (arr, i, value) => {
    let arr2 = [...arr];
    arr2[i] = value;
    return arr2;
  };
  const sendImgUrl = (roomId) => {
    let x;
    data.rooms.map((s) => {
      if (s._id === roomId) {
        x = s.imgurl;
      }
    });
    return x;
  };
  const sendDesc = (roomId) => {
    let x;
    data.rooms.map((s) => {
      if (s._id === roomId) {
        x = s.description;
      }
    });
    return x;
  };
  const fileChangeHandeler = (e, roomId, i) => {
    let temp = [...files];
    let x = [];
    let changed = false;
    x = temp.map((s) => {
      if (s.id === roomId) {
        changed = true;
        return {
          ...s,
          editedurl: changeArray(s.editedurl, i, e.target.files[0]),
        };
      } else {
        return { ...s };
      }
    });
    if (!changed) {
      setFiles((prev) => [
        ...prev,
        {
          id: roomId,
          editedurl: changeArray(["", ""], i, e.target.files[0]),
        },
      ]);
      return;
    }
    setFiles(x);
  };
  // {
  //     projectId:"",
  //     rooms:[
  //         {
  //             id:"",
  //              imgurl:"",
  //             editedurl:[""],
  //         }
  //     ]
  // progress:""
  // }
  const submitHandeler = async (e) => {
    e.preventDefault();
    try {
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
      let temp = await Promise.all(
        files.map(async (s) => {
          return {
            editedurl: await Promise.all(
              s.editedurl.map(async (k) => {
                const imgref = ref(imageDb, `files/${uuidv4()}`);
                await uploadBytes(imgref, k);
                const url = await getDownloadURL(imgref);
                return url;
              })
            ),
            id: s.id,
            //  description: s.desc,
          };
        })
      );
      temp = temp.map((s) => {
        return {
          ...s,
          imgurl: sendImgUrl(s.id),
          description: sendDesc(s.id),
        };
      });
      const res = await instance.put("/designer/projectupdate", {
        projectId: data._id,
        rooms: [...temp],
        progress: "Completed",
      });
      refetch();
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form className="flex flex-col  gap-4" onSubmit={submitHandeler}>
      {data?.rooms?.map((k) => {
        return (
          <React.Fragment key={k._id}>
            <div className="flex gap-2">
              {k?.imgurl?.map((t, i) => {
                return (
                  <div key={i}>
                    <img
                      className="w-40 aspect-square contain border-[1px] border-red-400"
                      src={t}
                      alt="room-img"
                    />
                    {data?.progress === "Pending" ? (
                      <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        required
                        onChange={(e) => {
                          fileChangeHandeler(e, k._id, i);
                        }}
                        accept="image/png,image/jpeg"
                        className="file-input file-input-xs file-input-bordered file-input-primary mr-2 max-w-xs  my-4 "
                      />
                    ) : (
                      <img
                        className="w-40 aspect-square contain border-[1px] border-green-400"
                        src={k?.editedurl[i]}
                        alt="room-img"
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <p>{k.description}</p>
          </React.Fragment>
        );
      })}
      {data?.progress === "Pending" && (
        <div>
          <button className="btn btn-primary btn-sm">Submit</button>
        </div>
      )}
    </form>
  );
};

export default RequestsComponent;
