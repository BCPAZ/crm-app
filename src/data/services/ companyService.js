import api from "../api";

const companyService = api.injectEndpoints({
  endpoints : (builder) => ({
    getGovernments : builder.query({
      query : () => ({
        url : '/companies/governments'
      }),
      providesTags : ['COMPANIES'],
      keepUnusedDataFor : 0
    })
  })
});

export const {useGetGovernmentsQuery} = companyService;

export default companyService