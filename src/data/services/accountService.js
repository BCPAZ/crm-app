import api from '@/data/api';

const accountService = api.injectEndpoints({
  endpoints: (builder) => ({
    currentAccount: builder.query({
      query: () => ({
        url: '/account',
        method: 'GET',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'account/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useCurrentAccountQuery , useLogoutMutation } = accountService;

export default accountService;
