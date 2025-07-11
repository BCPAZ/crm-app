import api from "@/data/api";

const companyService = api.injectEndpoints({
  endpoints: (builder) => ({
    getGovernments: builder.query({
      query: () => ({
        url: "/companies/governments",
      }),
      providesTags: ["COMPANIES"],
      keepUnusedDataFor: 0,
    }),

    getCompanyBySubdomain: builder.query({
      query: (subdomain) => ({
        url: `/companies/${subdomain}`,
      }),
    }),

    getCustomerCompanies: builder.query({
      query: () => ({
        url: "/companies/customers",
      }),
      providesTags: ["COMPANIES"],
      keepUnusedDataFor: 0,
    }),

    getMyCompanies: builder.query({
      query: () => ({
        url: "/my-companies",
      }),
      providesTags: ["MY_COMPANIES"],
      keepUnusedDataFor: 0,
    }),

    createCompany: builder.mutation({
      query: (data) => ({
        url: "/companies",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MY_COMPANIES"],
    }),
  }),
});

export const {
  useGetGovernmentsQuery,
  useGetCompanyBySubdomainQuery,
  useGetCustomerCompaniesQuery,
  useGetMyCompaniesQuery,
  useCreateCompanyMutation,
} = companyService;

export default companyService;
