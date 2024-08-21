import api from "@/data/api";

const mailService = api.injectEndpoints({
  endpoints: (builder) => ({
    getMails: builder.query({
      query: () => ({
        url: "/mails",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMailsQuery } = mailService;

export default mailService;
