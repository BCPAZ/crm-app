import api from '@/data/api';

const authService = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    forgotPassword : builder.mutation({
      query :(data) => ({
        url : '/auth/forgot-password',
        method : 'POST',
        body : data
      })
    })
  }),
});

export const { useLoginMutation, useForgotPasswordMutation } = authService;

export default authService;
