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
    logout : builder.mutation({
      query : () => ({
        url : 'auth/logout',
        method : 'POST',
        headers : {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      })
    })
  }),
});

export const { useLoginMutation , useLogoutMutation } = authService;

export default authService;
