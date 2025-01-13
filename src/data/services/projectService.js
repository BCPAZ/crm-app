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
      invalidatesTags: ["PROJECTS"],
    }),
    sendNotificationToProject: builder.mutation({
      query: (data) => ({
        url: "/projects/send-notification",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PROJECTS"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useSendNotificationToProjectMutation,
} = projectService;

export default projectService;
