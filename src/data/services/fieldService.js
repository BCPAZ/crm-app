import api from "@/data/api";

const fieldService = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllIssues: builder.query({
      query: () => ({
        url: "/field-management",
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
  }),
});

export const {
  useCreateIssueMutation,
  useGetAllIssuesQuery,
  useResolveIssueMutation,
} = fieldService;

export default fieldService;
