import api from "@/data/api";

const mailService = api.injectEndpoints({
  endpoints: (builder) => ({
    getMails: builder.query({
      query: (params) => ({
        url: "/mails",
        params,
      }),
    }),
  }),
});

export const { useGetMailsQuery } = mailService;

export default mailService;
