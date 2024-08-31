import api from "../api";

const workflowsService = api.injectEndpoints({
  endpoints: (builder) => ({
    getWorkflows: builder.query({
      query: (params) => ({
        url: "/workflows",
        params,
      }),
      providesTags: ["WORKFLOWS"],
      keepUnusedDataFor: 0,
    }),
    getWorkflowDetail: builder.query({
      query: (id) => ({
        url: `/workflows/${id}`,
      }),
      providesTags: ["WORKFLOWS"],
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetWorkflowsQuery, useGetWorkflowDetailQuery } = workflowsService;

export default workflowsService;
