import api from "@/data/api";

const usersService = api.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyUsers: builder.query({
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
      query: ({id, data}) => {
        console.log(data)
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("role_id", data.role_id);
        formData.append("phone", data.phone);
        formData.append("address", data.address);
        formData.append("city", data.city);
        formData.append("zip_code", data.zip_code);
        formData.append("about", data.about);

        if (formData.avatar) {
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
  }),
});

export const {
  useGetCompanyUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersService;

export default usersService;
