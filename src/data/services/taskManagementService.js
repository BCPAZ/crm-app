import api from "@/data/api";

const taskManagementService = api.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: () => ({
        url: "/task-management/boards",
      }),
    }),

    createBoard: builder.mutation({
      query: (data) => ({
        url: "/task-management/boards",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetBoardsQuery, useCreateBoardMutation } =
  taskManagementService;

export default taskManagementService;
