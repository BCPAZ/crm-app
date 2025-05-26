import api from "@/data/api";
import moment from "moment";

const workService = api.injectEndpoints({
  endpoints: (builder) => ({
    getWorks: builder.query({
      query: () => ({
        url: "/works",
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

        for (let i = 0; i < body.sub_works.length; i++) {
          formData.append(`sub_works[${i}][name]`, body.sub_works[i].name);
          formData.append(`sub_works[${i}][start_date]`, moment(body.sub_works[i].start_date).format("DD-MM-YYYY"));
          formData.append(`sub_works[${i}][end_date]`, moment(body.sub_works[i].end_date).format("DD-MM-YYYY"));
          formData.append(`sub_works[${i}][description]`, body.sub_works[i].description);
          formData.append(`sub_works[${i}][worker_id]`, body.sub_works[i].worker_id);
          formData.append(`sub_works[${i}][file]`, body.sub_works[i].file);
        }

        return {
          url: "/works",
          body: formData,
          method: "POST"
        }
      }
    })
  }),
});

export const { useGetWorksQuery, useDeleteWorkMutation, useCreateWorkMutation } = workService;

export default workService;
