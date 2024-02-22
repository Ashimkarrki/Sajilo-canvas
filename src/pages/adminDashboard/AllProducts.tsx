import React, { useState } from "react";
import AdminProductCard from "../../components/AdminProductCard";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import AdminCreateProduct from "../../components/AdminCreateProduct";

const AllProducts = () => {
  const [creation, setCreation] = useState(false);
  const fetchProjects = async ({ pageParam = 1 }) => {
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    try {
      const res = await instance(`admin/products/?page=${pageParam}`);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["admin product"],
  //   queryFn: fetchProjects,
  // });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextPage <= lastPage.totalPage) {
        return lastPage.nextPage;
      } else {
        return undefined;
      }
    },
  });

  if (status === "pending") {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="mx-2">
      {creation && (
        <AdminCreateProduct setCreation={setCreation} refetch={refetch} />
      )}
      <div className="flex justify-center">
        <button
          className="btn btn-primary"
          onClick={() => {
            setCreation(true);
          }}
        >
          Create
        </button>
      </div>
      <div className="flex gap-4 flex-wrap justify-center">
        {data?.pages?.map((group, i) => {
          return (
            <React.Fragment key={i}>
              {group.products?.map((s) => {
                return (
                  <AdminProductCard
                    id={s._id}
                    key={s._id}
                    name={s.name}
                    price={s.price}
                    desc={s.description}
                    refetch={refetch}
                    img_url={s.img_url}
                    all={s}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
      <div className="flex justify-center">
        <button
          className="btn"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
