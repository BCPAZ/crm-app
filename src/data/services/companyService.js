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
        url: "/companies/my-companies",
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

    getCompanyDetails: builder.query({
      query: (companyId) => ({
        url: `companies/details/${companyId}`,
      }),
      providesTags: ["COMPANY_DETAILS"],
      keepUnusedDataFor: 0,
    }),

    getCompanyUsers: builder.query({
      query: ({ companyId, ...params }) => ({
        url: `/companies/${companyId}/users`,
        params: Object.fromEntries(
          Object.entries(params).filter(([, value]) => value !== null)
        ),
      }),
      providesTags: ["COMPANY_USERS"],
      keepUnusedDataFor: 0,
    }),

    createCompanyUser: builder.mutation({
      query: ({ companyId, data }) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("role_id", data.role_id);
        formData.append("phone_number", data.phone_number);
        formData.append("address", data.address);
        formData.append("city", data.city);
        formData.append("zip_code", data.zip_code);
        formData.append("about", data.about);
        formData.append("type", data.type);
        if (data.avatar?.name) {
          formData.append("avatar", data.avatar);
        }
        return {
          url: `/companies/${companyId}/users`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["COMPANY_USERS"],
    }),

    getCompaniesWithWorks: builder.query({
      query: () => ({
        url: "/companies-with-works",
      }),
    }),
  }),
});

export const {
  useGetGovernmentsQuery,
  useGetCompanyBySubdomainQuery,
  useGetCustomerCompaniesQuery,
  useGetMyCompaniesQuery,
  useCreateCompanyMutation,
  useGetCompanyDetailsQuery,
  useGetCompanyUsersQuery,
  useCreateCompanyUserMutation,
  useGetCompaniesWithWorksQuery,
} = companyService;

export default companyService;
