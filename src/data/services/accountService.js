import api from '../api';

const accountService = api.injectEndpoints({
  endpoints: (builder) => ({
    currentAccount: builder.query({
      query: () => ({
        url: '/account',
        method: 'GET',
      }),
    }),
  }),
});

export const { useCurrentAccountQuery } = accountService;

export default accountService;
