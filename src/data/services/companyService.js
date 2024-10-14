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

    getCompany: builder.query({
      query: (subdomain) => ({
        url: `/companies/${subdomain}`,
      }),
      providesTags: ["COMPANIES"],
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetGovernmentsQuery, useGetCompanyQuery } = companyService;

export default companyService;
