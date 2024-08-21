import api from "@/data/api";

const mailService = api.injectEndpoints({
  endpoints: (builder) => ({
    getMails: builder.query({
      query: (params) => ({
        url: "/mails",
        params,
      }),
    }),
    getMailDetail : builder.query({
      query : (id) => ({
        url : `/mails/${id}`
      })
    })
  }),
});

export const { useGetMailsQuery,useGetMailDetailQuery } = mailService;

export default mailService;
