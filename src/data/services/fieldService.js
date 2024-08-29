import api from "@/data/api";

const fieldService = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllIssues: builder.query({
      query: (page) => ({
        url: `/field-management?page=${page}`,
      }),
      providesTags: ["FIELDS"],
      keepUnusedDataFor: 0,
    }),
    createIssue: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("assignee_id", data.assignee_id);

        if (data.files && data.files.length > 0) {
          data.files.forEach((file, index) => {
            formData.append(`files[${index}]`, file);
          });
        }

        return {
          url: "/field-management",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["FIELDS"],
      keepUnusedDataFor: 0,
    }),
    resolveIssue: builder.mutation({
      query: (id) => ({
        url: `/field-management/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["FIELDS"],
      keepUnusedDataFor: 0,
    }),
    getIssueDetail : builder.query({
      query : (id) => ({
        url : `/field-management/${id}`
      }),
      providesTags : ['FIELDS']
    })
  }),
});

export const {
  useCreateIssueMutation,
  useGetAllIssuesQuery,
  useResolveIssueMutation,
  useGetIssueDetailQuery
} = fieldService;

export default fieldService;
