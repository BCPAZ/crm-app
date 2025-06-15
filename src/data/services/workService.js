import api from "@/data/api";
import moment from "moment";

const workService = api.injectEndpoints({
  endpoints: (builder) => ({
    getWorks: builder.query({
      query: (params) => ({
        url: "/works",
        params,
      }),
      providesTags: ["WORKS"],
    }),

    deleteWork: builder.mutation({
      query: (id) => ({
        url: `/works/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WORKS"],
    }),

    createWork: builder.mutation({
      query: (body) => {
        const formData = new FormData();

        formData.append("name", body.name);
        formData.append("code", body.code);
        formData.append("description", body.description);
        formData.append("customer_id", body.customer_id);

        for (let i = 0; i < body.users.length; i++) {
          formData.append(`users[${i}]`, body.users[i]);
          console.log(body.users[i]);
        }

        for (let i = 0; i < body.sub_works.length; i++) {
          formData.append(`sub_works[${i}][name]`, body.sub_works[i].name);
          formData.append(
            `sub_works[${i}][start_date]`,
            moment(body.sub_works[i].start_date).format("DD-MM-YYYY")
          );
          formData.append(
            `sub_works[${i}][end_date]`,
            moment(body.sub_works[i].end_date).format("DD-MM-YYYY")
          );
          formData.append(
            `sub_works[${i}][description]`,
            body.sub_works[i].description
          );
          formData.append(
            `sub_works[${i}][worker_id]`,
            body.sub_works[i].worker_id
          );
          formData.append(`sub_works[${i}][file]`, body.sub_works[i].file);

          const children = body.sub_works[i]["children"] || [];

          for (let j = 0; j < children.length; j++) {
            formData.append(
              `sub_works[${i}][children][${j}][name]`,
              children[j]?.name
            );
            formData.append(
              `sub_works[${i}][children][${j}][start_date]`,
              moment(children[j]?.start_date).format("DD-MM-YYYY")
            );
            formData.append(
              `sub_works[${i}][children][${j}][end_date]`,
              moment(children[j]?.end_date).format("DD-MM-YYYY")
            );
            formData.append(
              `sub_works[${i}][children][${j}][description]`,
              children[j]?.description
            );
            formData.append(
              `sub_works[${i}][children][${j}][worker_id]`,
              children[j]?.worker_id
            );
            formData.append(
              `sub_works[${i}][children][${j}][file]`,
              children[j]?.file
            );
          }
        }

        return {
          url: "/works",
          body: formData,
          method: "POST",
        };
      },
    }),

    getWork: builder.query({
      query: (id) => ({
        url: `/works/${id}`,
      }),
      providesTags: ["WORK"],
    }),

    complete: builder.mutation({
      query: ({ id, isWork = false }) => ({
        url: isWork ? `/works/complete-work/${id}` : `/works/complete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["WORKS", "WORK"],
    }),

    addDocumentToWork: builder.mutation({
      query: ({
        sub_work_id = undefined,
        document_no,
        work_id = undefined,
      }) => ({
        url: `/works/add-document`,
        method: "POST",
        body: {
          sub_work_id,
          document_no,
          work_id,
        },
      }),
    }),
  }),
});

export const {
  useGetWorksQuery,
  useDeleteWorkMutation,
  useCreateWorkMutation,
  useGetWorkQuery,
  useCompleteMutation,
  useAddDocumentToWorkMutation,
} = workService;

export default workService;
