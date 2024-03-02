import React from "react";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import RequestsComponent from "../../components/RequestsComponent";
const DesignerRequests = () => {
  const [upload, setUpload] = useState([]);
  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["adminRequests"],
    queryFn: async () => {
      try {
        const res = await instance.get("/admin/projects?progress=Completed");
        console.log(res.data);

        return res.data.project;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
  });
  const submitHandeler = async (projectId) => {
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    const res = await instance.put("/admin/projectupdate", {
      projectId,
      progress: "Delivered",
    });
    console.log(res.data);

    refetch();
  };
  return (
    <div className="flex justify-center my-8">
      <div className="w-2/3">
        <h1 className="text-xl font-bold text-center">Designer Requests </h1>
        <div>
          {data?.map((s) => {
            return (
              <div className="flex justify-between gap-8" key={s._id}>
                <div>
                  <h1>Blue Print </h1>
                  <img
                    className="w-40 aspect-square contain mb-4"
                    src={s.blueprintURL}
                    alt="blueprint"
                  />
                  {/* <RequestsComponent data={s} refetch={refetch} /> */}
                  <div className="flex  flex-row gap-4">
                    {console.log(s)}

                    {s?.rooms?.map((k) => {
                      return (
                        <div className="flex  " key={k._id}>
                          {k?.imgurl?.map((t, i) => {
                            return (
                              <div key={i}>
                                <img
                                  className="w-40 aspect-square contain border-[1px] border-red-400"
                                  src={t}
                                  alt="room-img"
                                />
                                <img
                                  className="w-40 aspect-square contain border-[1px] border-green-400"
                                  src={k?.editedurl[i]}
                                  alt="room-img"
                                />
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                  <h1>- Someone</h1>
                </div>
                {!(data?.Progress === "Delivered") && (
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        submitHandeler(s._id);
                      }}
                    >
                      Send to User
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DesignerRequests;
