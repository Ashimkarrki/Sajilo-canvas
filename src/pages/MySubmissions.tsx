import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const MySubmissions = () => {
  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["my-sub"],
    queryFn: async () => {
      try {
        const res = await instance.get("/projectupdate");
        console.log(res.data);

        return res.data;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
  });
  // console.log(data);

  return (
    <div className="flex justify-center">
      {data?.length === 0 ? (
        <h1 className="text-xl font-bold text-center my-2 mt-8">
          Your Submission is Empty{" "}
        </h1>
      ) : (
        <div className="w-2/3">
          <h1 className="text-xl font-bold text-center my-2">
            My Submissions{" "}
          </h1>
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

                    <div className="flex flex-col  gap-4">
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
                                  {s.progress === "Delivered" && (
                                    <>
                                      <img
                                        className="w-40 aspect-square contain border-[1px]  border-green-500"
                                        src={k?.editedurl[i]}
                                        alt="room-img"
                                      />
                                    </>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-disabled btn-primary">
                      {s?.progress}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MySubmissions;
