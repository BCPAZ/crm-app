import api from "@/data/api";

const fieldService = api.injectEndpoints({
  endpoints : (builder) => ({
    getAllIssues : builder.query({
      query : () => ({
        url : '/field-management'
      }),
      providesTags : ['FIELDS'],
      keepUnusedDataFor : 0
    }),
    createIssue : builder.mutation({
      query : (data) => {
       const formData = new FormData();
       formData.append('name', data.name);
       formData.append('description', data.description);
       formData.append('assignee_id', data.assignee_id);
       if(data.files[0]){
        formData.append('files[0]', data.files[0]);
       }
       return{
        url : '/field-management',
        method : 'POST',
        body : formData
       }
      },
      invalidatesTags : ['FIELDS'],
      keepUnusedDataFor : 0
    }),
  })
});

export const {useCreateIssueMutation, useGetAllIssuesQuery} = fieldService;

export default fieldService;