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
        formData.append("company_customer_id", body.company_customer_id);

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

          if (body.sub_works[i].file && body.sub_works[i].file !== null) {
            formData.append(`sub_works[${i}][file]`, body.sub_works[i].file);
          }

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

            if (children[j]?.file && children[j]?.file !== null) {
              formData.append(
                `sub_works[${i}][children][${j}][file]`,
                children[j]?.file
              );
            }
          }
        }

        return {
          url: "/works",
          body: formData,
          method: "POST",
        };
      },
    }),

    updateWork: builder.mutation({
      query: ({ id, body }) => {
        const formData = new FormData();

        formData.append("name", body.name);
        formData.append("code", body.code);
        formData.append("description", body.description || "");
        formData.append("customer_id", body.customer_id);
        formData.append("company_customer_id", body.company_customer_id);

        // Users
        body.users.forEach((userId, index) => {
          formData.append(`users[${index}]`, userId);
        });

        // Sub works
        body.sub_works.forEach((subWork, i) => {
          if (subWork.id) {
            formData.append(`sub_works[${i}][id]`, subWork.id);
          }

          formData.append(`sub_works[${i}][name]`, subWork.name);
          formData.append(`sub_works[${i}][worker_id]`, subWork.worker_id);
          formData.append(
            `sub_works[${i}][start_date]`,
            subWork.start_date
              ? moment(subWork.start_date).format("YYYY-MM-DD")
              : ""
          );
          formData.append(
            `sub_works[${i}][end_date]`,
            subWork.end_date
              ? moment(subWork.end_date).format("YYYY-MM-DD")
              : ""
          );
          formData.append(
            `sub_works[${i}][description]`,
            subWork.description || ""
          );

          if (subWork.file && subWork.file instanceof File) {
            formData.append(`sub_works[${i}][file]`, subWork.file);
          }

          const children = subWork.children || [];

          children.forEach((child, j) => {
            if (child.id) {
              formData.append(`sub_works[${i}][children][${j}][id]`, child.id);
            }

            formData.append(
              `sub_works[${i}][children][${j}][name]`,
              child.name
            );
            formData.append(
              `sub_works[${i}][children][${j}][worker_id]`,
              child.worker_id
            );
            formData.append(
              `sub_works[${i}][children][${j}][start_date]`,
              child.start_date
                ? moment(child.start_date).format("YYYY-MM-DD")
                : ""
            );
            formData.append(
              `sub_works[${i}][children][${j}][end_date]`,
              child.end_date ? moment(child.end_date).format("YYYY-MM-DD") : ""
            );
            formData.append(
              `sub_works[${i}][children][${j}][description]`,
              child.description || ""
            );

            if (child.file && child.file instanceof File) {
              formData.append(
                `sub_works[${i}][children][${j}][file]`,
                child.file
              );
            }
          });
        });

        return {
          url: `/works/${id}`,
          method: "POST", // Laravel `update()` metodu PUT/PATCH yerine POST ile çalışıyor
          body: formData,
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
  useUpdateWorkMutation,
} = workService;

export default workService;
