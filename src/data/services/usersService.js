import api from "@/data/api";

const usersService = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (params) => ({
        url: "/users",
        params,
      }),
      providesTags: ["USERS"],
    }),
    createUser: builder.mutation({
      query: (data) => {
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
          url: "/users",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["USERS"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USERS"],
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => {
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
          url: `/users/${id}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["USERS"],
    }),
    getLastUsers: builder.query({
      query: () => ({
        url: "/users/last-five-users",
      }),
    }),
  }),
});

export const {
  //   useGetCompanyUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetLastUsersQuery,
} = usersService;

export default usersService;
