import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import RequestsComponent from "../../components/RequestsComponent";
const Requests = () => {
  const [upload, setUpload] = useState([]);
  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["adminRequests"],
    queryFn: async () => {
      try {
        const res = await instance.get("/designer/projects");
        return res.data.project;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
  });
  return (
    <div className="flex justify-center my-8">
      <div className="w-2/3">
        <h1 className="text-xl font-bold text-center">User Requests </h1>
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
                  <RequestsComponent data={s} refetch={refetch} />
                  {/* <div className="flex flex-col  gap-4">
                    {console.log(s)}

                    {s?.rooms?.map((k) => {
                      return (
                        <div className="flex " key={k._id}>
                          {k?.imgurl?.map((t, i) => {
                            return (
                              <img
                                key={i}
                                className="w-40 aspect-square contain"
                                src={t}
                                alt="room-img"
                              />
                            );
                          })}
                        </div>
                      );
                    })}
                  </div> */}
                  <h1>- Someone</h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
