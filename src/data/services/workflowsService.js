import api from "../api";

const workflowsService = api.injectEndpoints({
  endpoints: (builder) => ({
    getWorkflows: builder.query({
      query: (params) => ({
        url: "/workflows",
        params: Object.fromEntries(
          Object.entries(params).filter(([_, value]) => value !== null)
        ),
      }),
      providesTags: ["WORKFLOWS"],
      keepUnusedDataFor: 0,
    }),
    getInternalWorkflows: builder.query({
      query: (params) => ({
        url: "/internal-workflows",
        params: Object.fromEntries(
          Object.entries(params).filter(([_, value]) => value !== null)
        ),
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
    getInternalWorkflowDetail: builder.query({
      query: (id) => ({
        url: `/internal-workflows/${id}`,
      }),
      providesTags: ["WORKFLOWS"],
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useGetWorkflowsQuery,
  useGetWorkflowDetailQuery,
  useGetInternalWorkflowsQuery,
  useGetInternalWorkflowDetailQuery
} = workflowsService;

export default workflowsService;
