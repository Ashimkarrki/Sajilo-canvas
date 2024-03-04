import { useState } from "react";
import { Link } from "react-router-dom";

const Filters = () => {
  const [category] = useState([
    "Decoratives",
    "Kitchen Wares",
    "Bathroom Wares",
    "Furnitures",
  ]);
  const [options, setOptions] = useState({
    cat: "no",
    sort: "no",
    min: "no",
    max: "no",
  });

  const checkboxHandeler = (e: { target: { name: any } }) => {
    setOptions({ ...options, cat: e.target.name });
  };
  return (
    <form className="flex flex-col gap-4 p-4">
      <div>
        <h1>Category: </h1>
        {category.map((s: string) => {
          return (
            <div key={s} className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">{s}</span>
                <input
                  type="checkbox"
                  name={s}
                  checked={s === options.cat}
                  onChange={checkboxHandeler}
                  className="checkbox  checkbox-sm"
                />
              </label>
            </div>
          );
        })}
      </div>
      <div>
        <h1>Price : </h1>
        <div className="flex">
          <input
            onChange={(e) => {
              setOptions({ ...options, min: e.target.value });
            }}
            type="number"
            placeholder="min"
            className=" [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-2 w-20 px-1 rounded-md"
            name="min"
            id="min"
          />{" "}
          :{" "}
          <input
            onChange={(e) => {
              setOptions({ ...options, max: e.target.value });
            }}
            type="number"
            className=" [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-2 w-20 rounded-md"
            placeholder="max"
            name="max"
            id="max"
          />
        </div>
      </div>
      <div>
        <select
          className="select bg-white select-sm select-bordered w-full max-w-xs"
          onClick={(e) => {
            // console.log(e.target.value);

            setOptions({ ...options, sort: e.target.value });
          }}
        >
          <option disabled selected>
            Sort By
          </option>
          <option value={"price"}>Price</option>
          <option value={"latest"}>Latest</option>
        </select>
      </div>
      <Link
        to={`/shop/${1}/${options.sort === "no/" ? "" : `${options.sort}/`}${
          options.cat === "no/" ? "" : `${options.cat}/`
        }${options.min === "no/" ? "" : `${options.min}/`}${
          options.max === "no/" ? "" : `${options.max}`
        }`}
      >
        <button type="button" className="btn btn-ghost">
          Apply
        </button>
      </Link>
    </form>
  );
};

export default Filters;
