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
    sendMail : builder.query({
      query : (data) => {
        const formData = new FormData();
        formData.append('to', data.to);
        formData.append('subject', data.subject);
        formData.append('message', data.message);
        formData.append('cc', data.cc[0]);
        formData.append('bcc',data.bcc[0]);
        formData.append('reply_id', data.reply_id);
        
        if(data.attachment[0]){
          formData.append('attachment', data.attachment[0]);
        }

        return{
          url : '/mails',
          method : 'POST',
          body : formData
        }
      }
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
    forceDelete : builder.mutation({
      query : (id) => ({
        url : `/mails/${id}/force`,
        method : 'DELETE'
      })
    }),
    softDelete : builder.mutation({
      query : (id) => ({
        url : `/mails/${id}`,
        method : 'DELETE'
      })
    }),
    restoreMail : builder.mutation({
      query : (id) => ({
        url : `/mails/${id}/restore`,
        method : 'PATCH'
      })
    })
  }),
});

export const {
  useGetMailsQuery,
  useGetMailDetailQuery,
  useToggleStarredStatusMutation,
  useToggleImportantStatusMutation
} = mailService;

export default mailService;
