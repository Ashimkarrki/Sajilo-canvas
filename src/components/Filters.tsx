import { SetStateAction, useState } from "react";

const Filters = () => {
  const [category] = useState([
    "Decoratives",
    "Kitchen Wares",
    "Bathroom Wares",
    "Furnitures",
  ]);
  const [selected, setSelected] = useState("Descoratives");
  const checkboxHandeler = (e: {
    target: { name: SetStateAction<string> };
  }) => {
    setSelected(e.target.name);
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
                  checked={s === selected}
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
            type="number"
            placeholder="min"
            className=" [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-2 w-20 px-1 rounded-md"
            name="min"
            id="min"
          />{" "}
          :{" "}
          <input
            type="number"
            className=" [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-2 w-20 rounded-md"
            placeholder="max"
            name="max"
            id="max"
          />
        </div>
      </div>
      <div>
        <select className="select bg-white select-sm select-bordered w-full max-w-xs">
          <option disabled selected>
            Sort By
          </option>
          <option>Price</option>
          <option>Latest</option>
          {/* <option>React</option> */}
        </select>
      </div>
      <button className="btn btn-ghost">Apply</button>
    </form>
  );
};

export default Filters;
