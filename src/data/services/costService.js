import api from "../api";

const costService = api.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: (params) => ({
        url: "/invoices",
        params: Object.fromEntries(
          // eslint-disable-next-line no-unused-vars
          Object.entries(params).filter(([_, value]) => value !== null)
        ),
      }),
      providesTags: ["INVOICES"],
      keepUnusedDataFor: 0,
    }),
    // createInvoice: builder.mutation({
    //   query: (data) => ({
    //     url: "/invoices",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["INVOICES"],
    // }),
    createInvoice: builder.mutation({
      query: (data) => {
        console.log(data, '-----sended data')
        const formData = new FormData();
        
        if (data.from) {
          formData.append("from[name]", data.from.name || '');
          formData.append("from[email]", data.from.email || '');
          formData.append("from[address]", data.from.address || '');
          formData.append("from[phone]", data.from.phone || '');
        }
    
        if (data.to) {
          formData.append("to[name]", data.to.name || '');
          formData.append("to[email]", data.to.email || '');
          formData.append("to[address]", data.to.address || '');
          formData.append("to[phone]", data.to.phone || '');
        }
    
        if (data.items && Array.isArray(data.items)) {
          data.items.forEach((item, index) => {
            formData.append(`items[${index}][name]`, item.name || '');
            formData.append(`items[${index}][quantity]`, item.quantity || 0);
            formData.append(`items[${index}][unit_price]`, item.unit_price || 0);
          });
        }
    
        if (data.taxes) {
          formData.append("taxes", data.taxes);
        }
        if (data.note) {
          formData.append("note", data.note);
        }
    
        if (data.receipt_file) {
          formData.append('receipt_file', data.receipt_file);
        }
    
        return {
          url: '/invoices',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ["INVOICES"],
    }),
    
    updateInvoice: builder.mutation({
      query: ({ id, status }) => ({
        url: `/invoices/${id}/change-status`,
        method: "PUT",
        body: {status},
      }),
      invalidatesTags: ["INVOICES"],
    }),
    getDashboard: builder.query({
      query: () => ({
        url: "/invoices/dashboard",
      }),
      keepUnusedDataFor: 0,
    }),
    deleteInvoice : builder.mutation({
      query : (id) => ({
        url : `/invoices/${id}`,
        method : 'DELETE'
      }),
      invalidatesTags : ['INVOICES'],
    }),
    getInvoiceDetail : builder.query({
      query : (id) => ({
        url : `/invoices/${id}`,
      })
    })
  }),
});

export const {
  useGetInvoicesQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useGetDashboardQuery,
  useDeleteInvoiceMutation,
  useGetInvoiceDetailQuery
} = costService;

export default costService;
