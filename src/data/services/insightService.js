import api from "@/data/api";

const insightService = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getWorkflowInsights: build.query({
      query: (params) => ({
        url: "/insights/workflows",
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ["INSIGHTS"],
    }),

    sendedMails: build.query({
      query: (params) => ({
        url: "/insights/sended-mails",
        params,
      }),
      keepUnusedDataFor: 0,
    }),

    reveicedMails: build.query({
      query: (params) => ({
        url: "/insights/received-mails",
        params,
      }),
      keepUnusedDataFor: 0,
    }),

    sendedDocuments: build.query({
      query: (params) => ({
        url: "/insights/documents",
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ["INSIGHTS"],
    }),
  }),
});

export const {
  useGetWorkflowInsightsQuery,
  useSendedMailsQuery,
  useReveicedMailsQuery,
  useSendedDocumentsQuery,
} = insightService;

export default insightService;
