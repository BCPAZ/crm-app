import api from "@/data/api";

const positionsService = api.injectEndpoints({
  endpoints: (builder) => ({
    getPositions: builder.query({
      query: () => ({
        url: '/positions',
      }),
      providesTags: ['POSITIONS'],
    }),
    createPosition : builder.mutation({
      query : (data) => ({
        url : '/positions',
        method : 'POST',
        body : data
      }),
      invalidatesTags: ['POSITIONS']
    }),
    deletePosition : builder.mutation({
      query : (id) => ({
        url : `/positions/${id}`,
        method : 'DELETE',
      }),
      invalidatesTags: ['POSITIONS']
    })
  }),
});

export const { useCreatePositionMutation , useGetPositionsQuery , useDeletePositionMutation } = positionsService;

export default positionsService;
