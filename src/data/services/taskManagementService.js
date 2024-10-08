import api from "@/data/api";

const taskManagementService = api.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: () => ({
        url: "/task-management/boards",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["BOARDS"],
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
      query: ({ id, data }) => ({
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

    getTask: builder.query({
      query: (id) => ({
        url: `/task-management/tasks/${id}`,
      }),
      providesTags: (result, error, id) => {
        return [{ type: "TASK", id }]
      },
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/task-management/tasks/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["BOARDS"],
    }),
    getLastTask: builder.query({
      query: () => ({
        url: "/task-management/tasks/last-five-tasks",
      }),
    }),

    createComment: builder.mutation({
      query: ({ taskId, data }) => {
        const formData = new FormData();
        if (data?.image) {
          formData.append("image", data?.image);
        }

        if (data?.attachment) {
          formData.append("attachment", data?.attachment);
        }

        if (data?.text) {
          formData.append("text", data?.text);
        }

        return {
          url: `/task-management/task-comments/${taskId}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (result, error, {taskId}) => { 
        console.log(taskId)
        return [{ type: "TASK", id: taskId }]
      },
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
  useGetTaskQuery,
  useDeleteTaskMutation,
  useGetLastTaskQuery,
  useCreateCommentMutation,
} = taskManagementService;

export default taskManagementService;
