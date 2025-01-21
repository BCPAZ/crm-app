import api from "@/data/api";

const projectService = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: "/projects",
      }),
      providesTags: ["PROJECTS"],
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PROJECTS", "GROUPPED_PROJECTS"],
    }),
    sendNotificationToProject: builder.mutation({
      query: (data) => ({
        url: "/projects/send-notification",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PROJECTS"],
    }),
    deleteProject : builder.mutation({
      query : (id) => ({
        url : `/projects/${id}`,
        method : "DELETE"
      }),
      invalidatesTags : ['PROJECTS']
    }),
    grouppedProjects : builder.query({
      query : () => ({
        url : '/projects/groupped-by-users',
      }),
      providesTags : ['GROUPPED_PROJECTS']
    })
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useSendNotificationToProjectMutation,
  useDeleteProjectMutation,
  useGrouppedProjectsQuery
} = projectService;

export default projectService;
