import api from "@/data/api";

const positionsService = api.injectEndpoints({
  endpoints: (builder) => ({
    getPositions: builder.query({
      query: () => ({
        url: "/positions",
      }),
      providesTags: ["POSITIONS"],
    }),
    createPosition: builder.mutation({
      query: (data) => ({
        url: "/positions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["POSITIONS"],
    }),
    deletePosition: builder.mutation({
      query: (id) => ({
        url: `/positions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["POSITIONS"],
    }),
    updatePosition: builder.mutation({
      query: ({ id, data }) => ({
        url: `/positions/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["POSITIONS"],
    }),
  }),
});

export const {
  useCreatePositionMutation,
  useGetPositionsQuery,
  useDeletePositionMutation,
  useUpdatePositionMutation,
} = positionsService;

export default positionsService;
