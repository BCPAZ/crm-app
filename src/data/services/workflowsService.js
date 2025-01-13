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
      providesTags: ["WORKFLOW"],
      keepUnusedDataFor: 0,
    }),
    updateWorkflowDetail : builder.mutation({
      query : ({id, ...data}) => ({
        url : `/workflows/${id}`,
        method : 'PUT',
        body : data
      }),
      invalidatesTags : ['WORKFLOW']
    }),
    getInternalWorkflowDetail: builder.query({
      query: (id) => ({
        url: `/internal-workflows/${id}`,
      }),
      providesTags: ["INTERNAL_WORKFLOW"],
      keepUnusedDataFor: 0,
    }),
    updateInternalWorkflowDetail : builder.mutation({
      query : ({id, ...data}) => ({
        url : `/internal-workflows/${id}`,
        method : 'PUT',
        body : data
      }),
      invalidatesTags : ['INTERNAL_WORKFLOW']
    })
  }),
});

export const {
  useGetWorkflowsQuery,
  useGetWorkflowDetailQuery,
  useGetInternalWorkflowsQuery,
  useGetInternalWorkflowDetailQuery,
  useUpdateInternalWorkflowDetailMutation,
  useUpdateWorkflowDetailMutation
} = workflowsService;

export default workflowsService;
