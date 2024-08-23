import api from "@/data/api";

const mailService = api.injectEndpoints({
  endpoints: (builder) => ({
    getMails: builder.query({
      query: (params) => ({
        url: "/mails",
        params,
      }),
      providesTags: ["MAILS"],
      serializeQueryArgs: ({ queryArgs }) => {
        // eslint-disable-next-line no-unused-vars
        const { page, ...args } = queryArgs;
        return args;
      },
      merge: (currentCacheData, responseData) => {
        if (
          currentCacheData.meta.current_page === responseData.meta.current_page
        ) {
          currentCacheData.mails = [];
        }
        currentCacheData?.mails?.push(...responseData.mails);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getMailDetail: builder.query({
      query: (id) => ({
        url: `/mails/${id}`,
      }),
      providesTags: ["MAILS"],
    }),
    sendMail: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append("to", data.to);
        formData.append("subject", data.subject);
        formData.append("message", data.message);

        if (data.reply_id) {
          formData.append("reply_id", data.reply_id);
        }

        data?.cc?.forEach((item, index) => {
          formData.append(`cc[${index}]`, item);
        });

        data?.bcc?.forEach((item, index) => {
          formData.append(`bcc[${index}]`, item);
        });

        data?.attachments?.forEach((item, index) => {
          formData.append(`attachment[${index}]`, item);
        });

        return {
          url: "/mails",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["MAILS"],
    }),
    toggleStarredStatus: builder.mutation({
      query: ({ id, is_starred }) => ({
        url: `/mails/${id}/is-starred`,
        method: "PATCH",
        body: { is_starred },
      }),
      invalidatesTags: ["MAILS"],
    }),
    toggleImportantStatus: builder.mutation({
      query: (id, { is_important }) => ({
        url: `/mails/${id}/is-important`,
        method: "PATCH",
        body: { is_important },
      }),
      invalidatesTags: ["MAILS"],
    }),
    forceDelete: builder.mutation({
      query: (id) => ({
        url: `/mails/${id}/force`,
        method: "DELETE",
      }),
      invalidatesTags: ["MAILS"],
    }),
    softDelete: builder.mutation({
      query: (id) => ({
        url: `/mails/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MAILS"],
    }),
    restoreMail: builder.mutation({
      query: (id) => ({
        url: `/mails/${id}/restore`,
        method: "PATCH",
      }),
      invalidatesTags: ["MAILS"],
    }),
  }),
});

export const {
  useGetMailsQuery,
  useGetMailDetailQuery,
  useToggleStarredStatusMutation,
  useToggleImportantStatusMutation,
  useForceDeleteMutation,
  useRestoreMailMutation,
  useSoftDeleteMutation,
  useSendMailMutation,
} = mailService;

export default mailService;
