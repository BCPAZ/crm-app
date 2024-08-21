import api from "@/data/api";

const mailService = api.injectEndpoints({
  endpoints: (builder) => ({
    getMails: builder.query({
      query: (params) => ({
        url: "/mails",
        params,
      }),
    }),
    getMailDetail: builder.query({
      query: (id) => ({
        url: `/mails/${id}`,
      }),
    }),
    toggleStarredStatus: builder.mutation({
      query: ({ id, is_starred }) => ({
        url: `/mails/${id}/is-starred`,
        method: "PATCH",
        body: { is_starred },
      }),
      invalidatesTags: ({ id }) => [{ type: "MAIL" }, id],
    }),
    toggleImportantStatus: builder.mutation({
      query: (id, { is_important }) => ({
        url: `/mails/${id}/is-important`,
        method: "PATCH",
        body: { is_important },
      }),
    }),
  }),
});

export const {
  useGetMailsQuery,
  useGetMailDetailQuery,
  useToggleStarredStatusMutation,
  useToggleImportantStatusMutation
} = mailService;

export default mailService;
