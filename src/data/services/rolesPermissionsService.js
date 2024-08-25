import api from "@/data/api";

const rolesPermissionsService = api.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: () => ({
        url: "/roles",
      }),
      providesTags: ["ROLES"],
    }),
    createRole: builder.mutation({
      query: (data) => ({
        url: "/roles",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ROLES"],
    }),
    getPermissions: builder.query({
      query: () => ({
        url: "/permissions",
      }),
      providesTags: ["PERMISSIONS"],
    }),
    updateRole: builder.mutation({
      query: ({id, data}) => ({
        url: `/roles/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ROLES"],
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ROLES"],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useCreateRoleMutation,
  useGetPermissionsQuery,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = rolesPermissionsService;

export default rolesPermissionsService;
