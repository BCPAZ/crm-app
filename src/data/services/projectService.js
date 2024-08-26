import api from "@/data/api";

const projectService = api.injectEndpoints({
  endpoints : (builder) => ({
    getProjects : builder.mutation({
      query : () => ({
        url : '/projects'
      })
    })
  })
})

export const {useGetProjectsQuery} = projectService;

export default projectService;