import api from "@/data/api";

const positionService = api.injectEndpoints({
  endpoints: (builder) => ({
    getPositions: builder.query({
      query: () => ({
        url: "/positions",
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

export const { useGetPositionsQuery } = positionService;

export default positionService;
