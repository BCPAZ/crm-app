import api from "@/data/api";

const insightService = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getWorkflowInsights: build.query({
      query: (params) => ({
        url: "/insights/workflows",
        params
      }),
      keepUnusedDataFor: 0,
      providesTags: ["INSIGHTS"],
    }),
  }),
});

export const { useGetWorkflowInsightsQuery } = insightService

export default insightService