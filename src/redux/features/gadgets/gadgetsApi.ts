import { IQuery } from "@/interface/query.interface";
import { baseApi } from "../../api/baseApi";

const gadgetsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addGadget: builder.mutation({
      query: (gadgetInfo) => ({
        url: "/products/create-product",
        method: "POST",
        body: gadgetInfo,
      }),
    }),
    getGadgets: builder.query({
      query: (data?: IQuery) => {
        let searchParams = {};
        if (data) {
          searchParams = new URLSearchParams({
            ...(data.minPrice && { minPrice: data.minPrice }),
            ...(data.maxPrice && { maxPrice: data.maxPrice }),
            ...(data.releaseDate && { releaseDate: data.releaseDate }),
            ...(data.brand && { brand: data.brand }),
            ...(data.modelNumber && { modelNumber: data.modelNumber }),
            ...(data.category && { category: data.category }),
            ...(data.operatingSystem && {
              operatingSystem: data.operatingSystem,
            }),
            ...(data.connectivity && { connectivity: data.connectivity }),
            ...(data.powerSource && { powerSource: data.powerSource }),
          });
        }
        return {
          url: `/products/get-products?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["gadgets"],
    }),

    getSingleGadget: builder.query({
      query: (id) => ({
        url: `/products/get-product/${id}`,
        method: "GET",
      }),
    }),
    updateGadget: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/products/update-product/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["gadgets"],
    }),
  }),
});

export const {
  useAddGadgetMutation,
  useGetGadgetsQuery,
  useGetSingleGadgetQuery,
  useUpdateGadgetMutation,
} = gadgetsApi;
