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
  }),
});

export const { useGetGovernmentsQuery, useGetCompanyBySubdomainQuery } = companyService;

export default companyService;
