import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProjectForward from "../../components/ProjectForward";

const UserRequests = () => {
  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userRequest"],
    queryFn: async () => {
      try {
        const res1 = await instance.get("/admin/projects");
        const res2 = await instance.get("/admin/designers");
        return { project: res1.data.project, designer: res2.data.desingers };
      } catch (err) {
        console.log(err);
        return err;
      }
    },
  });
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>;
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <div className="w-2/3">
        <h1 className="text-xl font-bold text-center">User Requests </h1>
        <div>
          {data?.project?.map((s) => {
            return (
              <div className="flex justify-between gap-8" key={s._id}>
                <div>
                  <h1 className="my-4">Blue Print </h1>
                  <img
                    className="w-40 aspect-square contain mb-4"
                    src={s.blueprintURL}
                    alt="blueprint"
                  />

                  <div className="flex flex-col  gap-4 w-full">
                    {s?.rooms?.map((k) => {
                      return (
                        <div className="flex flex-col   " key={k._id}>
                          <p className="text-center">User Requested</p>
                          <div className="flex">
                            {k?.imgurl?.map((t, i) => {
                              return (
                                <div key={i}>
                                  <img
                                    className="w-40 aspect-square contain border-[1px] border-red-400"
                                    src={t}
                                    alt="room-img"
                                  />
                                  {(s.progress === "Completed" ||
                                    s.progress === "Delivered") && (
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

                          <p className="block text-center ">{k.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {s.progress == "Pending" && (
                  <ProjectForward refetch={refetch} data={data} s={s} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserRequests;
