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
      }),
    }),
    toggleStarredStatus : builder.mutation({
      query : ({id , is_starred}) => ({
        url : `/mails/${id}/is-starred`,
        method : 'PATCH',
        body : {is_starred}
      }),
      invalidatesTags : (result, error , {id}) => [{type : 'MAIL'}, id]
    })
  }),
});

export const { useGetMailsQuery,useGetMailDetailQuery, useToggleStarredStatusMutation } = mailService;

export default mailService;
