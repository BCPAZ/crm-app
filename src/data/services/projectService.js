import api from "@/data/api";

const projectService = api.injectEndpoints({
  endpoints : (builder) => ({
    getProjects : builder.mutation({
      query : () => ({
        url : '/projects'
      }),
      providesTags : ['PROJECTS']
    }),
    createProject : builder.mutation({
      query : (data) => ({
        url : '/projects',
        method : 'POST',
        body : data
      })
    })
  })
})

export const {useGetProjectsQuery} = projectService;

export default projectService;