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
  }),
});

export const {
  useGetGovernmentsQuery,
  useGetCompanyBySubdomainQuery,
  useGetCustomerCompaniesQuery,
} = companyService;

export default companyService;
