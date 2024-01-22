const Checkout = () => {
  return (
    <div className="flex w-full bg-green-50 justify-center py-8">
      <form className="flex flex-col gap-4">
        <div>
          <h1 className="text-center font-medium divider">
            Shipping Information
          </h1>
          <div className="flex">
            <label className="form-control w-full max-w-xs input-lg">
              <div className="label">
                <span className="label-text">First name</span>
              </div>
              <input
                required
                type="text"
                name="fName"
                className="input input-bordered w-full max-w-xs p-2"
              />
            </label>{" "}
            <label className="form-control w-full max-w-xs input-lg">
              <div className="label">
                <span className="label-text">Last name</span>
              </div>
              <input
                required
                name="lName"
                type="text"
                className="input input-bordered w-full max-w-xs p-2"
              />
            </label>
          </div>
        </div>
        <div className="flex">
          <label className="form-control w-full max-w-xs input-lg">
            <div className="label">
              <span className="label-text">Address</span>
            </div>
            <input
              required
              type="text"
              name="address"
              className="input input-bordered w-full max-w-xs p-2"
            />
          </label>

          <label className="form-control w-full max-w-xs input-lg">
            <div className="label">
              <span className="label-text">City</span>
            </div>
            <input
              required
              type="text"
              name="city"
              className="input input-bordered w-full max-w-xs p-2"
            />
          </label>
        </div>
        <div className="flex">
          <label className="form-control w-full max-w-xs input-lg">
            <div className="label">
              <span className="label-text">State</span>
            </div>
            <input
              required
              type="text"
              name="state"
              className="input input-bordered w-full max-w-xs p-2"
            />
          </label>

          <label className="form-control w-full max-w-xs input-lg">
            <div className="label">
              <span className="label-text">Postal Code</span>
            </div>
            <input
              required
              type="text"
              name="postalCode"
              className="input input-bordered w-full max-w-xs p-2"
            />
          </label>
        </div>

        <label className="form-control w-full max-w-xs input-lg">
          <div className="label">
            <span className="label-text">Phone Number</span>
          </div>
          <input
            required
            type="tel"
            name="phoneNumber"
            className="input input-bordered w-full max-w-xs p-2"
          />
        </label>
      </form>
    </div>
  );
};

export default Checkout;
