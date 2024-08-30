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
        formData.append("template_id", data.template_id);
        formData.append("file", data.file);
        formData.append("document_no", data.document_no);
        formData.append("author", data.author);
        formData.append("type", data.type);

        return {
          url: "documents",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useUploadDocumentMutation } = documentService;

export default documentService