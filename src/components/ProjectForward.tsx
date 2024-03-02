import { useState } from "react";
import axios from "axios";
const ProjectForward = ({ data, s, refetch }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  return (
    <form
      className="flex items-end flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          setIsLoading(true);
          const res = await instance.post("/admin/forward", {
            email: email,
            id: s._id,
          });
          refetch();
          setIsLoading(false);
          console.log(res);
        } catch (err) {
          setIsLoading(false);
          console.log(err);
        }
      }}
    >
      <select
        required
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="select select-sm select-bordered w-full max-w-xs"
      >
        <option value={""} disabled selected={!s?.forwardedto}>
          Forward To
        </option>
        {data?.designer?.map((o) => {
          return (
            <option
              value={o.email}
              selected={s.forwardedto === o.email}
              key={o._id}
            >
              {o.email}
            </option>
          );
        })}
      </select>
      {isLoading ? (
        <button className="btn">
          <span className="loading loading-spinner"></span>
        </button>
      ) : (
        <button className="btn btn-primary btn-sm">Send </button>
      )}
    </form>
  );
};

export default ProjectForward;
