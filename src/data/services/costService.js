import api from "../api";

const costService = api.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: (params) => ({
        url: "/invoices",
        params: Object.fromEntries(
          Object.entries(params).filter(([_, value]) => value !== null)
        ),
      }),
      providesTags: ["INVOICES"],
      keepUnusedDataFor: 0,
    }),
    createInvoice: builder.mutation({
      query: (data) => ({
        url: "/invoices",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["INVOICES"],
    }),
    updateInvoice: builder.mutation({
      query: ({ id, data }) => ({
        url: `/invoices/${id}/change-status`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["INVOICES"],
    }),
    getDashboard: builder.mutation({
      query: () => ({
        url: "/invoices/dashboard",
      }),
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useGetDashboardMutation,
} = costService;

export default costService;
