import api from "@/data/api";

const templateService = api.injectEndpoints({
  endpoints: (builder) => ({
    getTemplates: builder.query({
      query: () => ({
        url: "/templates",
      }),
      providesTags: ["TEMPLATES"],
      keepUnusedDataFor: 0,
    }),
    createTemplate: builder.mutation({
      query: (data) => ({
        url: "/templates",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["TEMPLATES"],
      keepUnusedDataFor: 0,
    }),
    detailTemplate: builder.query({
      query: (id) => ({
        url: `templates/${id}`,
      }),
      providesTags: ["TEMPLATES"],
      keepUnusedDataFor: 0,
    }),
    deleteTemplate: builder.mutation({
      query: (id) => ({
        url: `/templates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TEMPLATES"],
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useCreateTemplateMutation,
  useGetTemplatesQuery,
  useDeleteTemplateMutation,
  useDetailTemplateQuery,
} = templateService;

export default templateService;
