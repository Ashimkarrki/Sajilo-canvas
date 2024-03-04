import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const Orders = ({ status }) => {
  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const fetchOrders = async () => {
    try {
      const res = await instance.get("/admin/orders?status=" + status);
      return res.data.order;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  const { data, isLoading, refetch } = useQuery({
    queryFn: fetchOrders,
    queryKey: ["orders" + status],
  });
  const nextStatus = () => {
    let next = "";
    if (status === "Not verified") {
      next = "Verified";
    } else if (status === "Verified") {
      next = "Delivering";
    } else if (status === "Delivering") {
      next = "Delivered";
    }
    return next;
  };
  const StatusChanger = async (id) => {
    try {
      const res = await instance.put("admin/orderupdate/", {
        orderid: id,
        status: nextStatus(),
      });
      refetch();

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(data);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Order No </th>
              <th>Products</th>
              <th>Address</th>
              <th>Full Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((s) => {
              return (
                <tr key={s._id}>
                  <td>{s._id}</td>
                  <td>
                    {s?.products?.map((k) => {
                      return (
                        <div key={k._id}>
                          {" "}
                          {k.name} ( x {k.quantity} ){" "}
                        </div>
                      );
                    })}
                  </td>
                  <td>
                    {s.City} , {s.District} , {s.Pickuppoint}
                  </td>
                  <td>{s.Fullname}</td>
                  <td>{s.PhoneNo}</td>
                  <td>{s.Email}</td>
                  <td>{s.totalamount}</td>
                  <td>
                    {status === "Delivered" ? (
                      <button className="btn btn-disabled">
                        Already Delivered
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          StatusChanger(s._id);
                        }}
                      >
                        {status === "Not verified"
                          ? "Verify"
                          : status === "Verified"
                          ? "Delivering"
                          : status === "Delivering"
                          ? "Delivered"
                          : ""}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
