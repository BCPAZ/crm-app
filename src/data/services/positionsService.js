import api from "@/data/api";

const positionsService = api.injectEndpoints({
  endpoints: (builder) => ({
    getPositions: builder.query({
      query: () => ({
        url: '/positions',
      }),
    }),
    createPosition : builder.mutation({
      query : (data) => ({
        url : '/positions',
        method : 'POST',
        body : data
      })
    })
  }),
});

export const { useCreatePositionMutation , useGetPositionsQuery } = positionsService;

export default positionsService;
