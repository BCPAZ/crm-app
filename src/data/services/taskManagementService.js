import api from "@/data/api";

const taskManagementService = api.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: () => ({
        url: "/task-management/boards",
      }),
      keepUnusedDataFor: 0,
    }),

    createBoard: builder.mutation({
      query: (data) => ({
        url: "/task-management/boards",
        method: "POST",
        body: data,
      }),
    }),

    deleteBoard: builder.mutation({
      query: (id) => ({
        url: `/task-management/boards/${id}`,
        method: "DELETE",
      }),
    }),

    updateBoard: builder.mutation({
      query: ({ id, data }) => ({
        url: `/task-management/boards/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    changeBoardPosition: builder.mutation({
      query: ({ old_position, new_position }) => ({
        url: "/task-management/boards/change-position",
        method: "PUT",
        body: {
          old_position,
          new_position,
        },
      }),
    }),

    createTask: builder.mutation({
      query: ({id, data}) => ({
        url: `/task-management/tasks/${id}`,
        method: "POST",
        body: data,
      }),
    }),

    changeTaskPosition: builder.mutation({
      query: ({ board_id, task_id, position }) => ({
        url: "/task-management/tasks/change-position",
        method: "PUT",
        body: {
          board_id,
          task_id,
          position,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetBoardsQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useUpdateBoardMutation,
  useChangeBoardPositionMutation,
  useCreateTaskMutation,
  useChangeTaskPositionMutation,
} = taskManagementService;

export default taskManagementService;
