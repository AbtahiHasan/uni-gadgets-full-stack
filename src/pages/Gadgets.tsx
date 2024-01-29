/* eslint-disable @typescript-eslint/no-explicit-any */
import Heading from "@/components/shared/heading";

import {
  useDeleteGadgetMutation,
  useDeleteMultipleMutation,
  useGetGadgetsQuery,
} from "@/redux/features/gadgets/gadgetsApi";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import moment from "moment";
import toast from "react-hot-toast";

const Gadgets = () => {
  const { data } = useGetGadgetsQuery(undefined);
  const [deleteMultiple] = useDeleteMultipleMutation();
  const [ids, setIds] = useState<string[]>([]);
  const [deleteGadget] = useDeleteGadgetMutation();
  const handleGetIds = (id: string) => {
    if (!ids.includes(id)) {
      setIds([...ids, id]);
    }
  };
  const deleteBulk = () => {
    deleteMultiple(ids);
  };
  return (
    <main>
      <Heading title="Gadgets Management" />

      <section className="overflow-x-auto max-w-[900px] mx-auto">
        <Button onClick={deleteBulk}>Bulk Delete</Button>
        <table className="w-[900px] mx-auto mt-5">
          <thead className="bg-[#c1c1c1] ">
            <tr>
              <th className="py-2">Bulk</th>
              <th className="py-2">Index</th>
              <th className="py-2">Gadgets Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Release Date</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data?.data) &&
              data?.data?.map((gadget: any, i: number) => {
                const {
                  _id,
                  name,
                  price,
                  releaseDate,
                  brand,
                  category,
                  quantity,
                } = gadget;

                return (
                  <tr key={_id} className="border-b ">
                    <td className="font-bold py-1 text-center">
                      <Input
                        onChange={() => handleGetIds(_id.toString())}
                        className="scale-50 rounded"
                        type="checkbox"
                      />
                    </td>
                    <td className="font-bold py-1 text-center">{i + 1}</td>
                    <td className="py-1 text-center">{name}</td>
                    <td className="py-1 text-center">{price}</td>
                    <td className="py-1 text-center">{quantity}</td>
                    <td className="py-1 text-center">
                      {moment(releaseDate).format("DD/MM/YYYY")}
                    </td>
                    <td className="py-1 text-center">{brand}</td>
                    <td className="py-1 text-center">{category}</td>
                    <td className="py-1 text-center">
                      <Link to={`/dashboard/gadgets/${_id}`}>
                        <button className="text-xl p-2 border rounded-lg ">
                          <FaRegEdit />
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          deleteGadget(_id.toString());
                          toast.success("gadget deleted successfully", {
                            position: "top-right",
                          });
                        }}
                        className="text-xl ml-1 text-red-600 border-red-600 p-2 border rounded-lg "
                      >
                        <MdOutlineDeleteOutline />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Gadgets;
