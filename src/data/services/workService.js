import api from "@/data/api";

const workService = api.injectEndpoints({
  endpoints: (builder) => ({
    getWorks: builder.query({
      query: () => ({
        url: "/works",
      }),
      providesTags: ["WORKS"],
    }),

    deleteWork: builder.mutation({
      query: (id) => ({
        url: `/works/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WORKS"],
    }),
  }),
});

export const { useGetWorksQuery, useDeleteWorkMutation } = workService;

export default workService;
