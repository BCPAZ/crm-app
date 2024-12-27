import api from "@/data/api";

const documentService = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    uploadDocument: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("comment", data.comment);
        formData.append("page_size", data.page_size);
        formData.append("file", data.file);
        formData.append("document_no", data.document_no);
        formData.append("author", data.author);
        formData.append("type", data.type);
    
        const templateId = data.template_id || null;
        const internalTemplateId = data.internal_template_id || null;
    
        if (templateId) {
          formData.append("template_id", templateId);
        }
    
        if (internalTemplateId) {
          formData.append("internal_template_id", internalTemplateId);
        }
    
        return {
          url: "documents",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["DOCUMENTS"],
    }),
    getDocuments: builder.query({
      query: (params) => ({
        url: "/documents",
        params: Object.fromEntries(
          Object.entries(params).filter(([_, value]) => value !== null)
        ),
      }),
      providesTags: ["DOCUMENTS"],
      keepUnusedDataFor: 0,
    }),
    getDocumentById: builder.query({
      query: (id) => ({
        url: `/documents/${id}`,
      }),
      providesTags: ["DOCUMENT"],
      keepUnusedDataFor: 0,
    }),
    submitDocument: builder.mutation({
      query: (id) => ({
        url: `/documents/${id}/submit-for-review`,
        method: "POST",
      }),
      invalidatesTags: ["WORKFLOWS"],
    }),
  }),
});

export const {
  useUploadDocumentMutation,
  useGetDocumentsQuery,
  useSubmitDocumentMutation,
  useGetDocumentByIdQuery,
} = documentService;

export default documentService;
