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
    getInternalTemplates : builder.query({
      query : () => ({
        url : "/internal-templates"
      }),
      providesTags : ["INTERNAL-TEMPLATES"],
      keepUnusedDataFor : 0
    }),
    createTemplate: builder.mutation({
      query: (data) => ({
        url: "/templates",
        method: "POST",
        body: {
          ...data,
          duration: data?.duration?.map((c) => ({
            ...c,
            companies: c?.companies?.map((c) => c.id),
          })),
        },
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
    deleteInternalTemplate: builder.mutation({
      query: (id) => ({
        url: `/internal-templates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["INTERNAL-TEMPLATES"],
      keepUnusedDataFor: 0,
    }),
    createInternalTemplate: builder.mutation({
      query: (data) => ({
        url: "/internal-templates",
        method: "POST",
        body: {
          ...data,
          duration: data?.duration?.map((c) => ({
            ...c,
            users: c?.users?.map((c) => c.id),
          })),
        },
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
  useCreateInternalTemplateMutation,
  useGetInternalTemplatesQuery,
  useDeleteInternalTemplateMutation
} = templateService;

export default templateService;
