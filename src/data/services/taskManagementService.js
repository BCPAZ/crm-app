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
        return [{ type: "TASK", id }];
      },
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/task-management/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TASK"],
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
      invalidatesTags: (result, error, { taskId }) => {
        return [{ type: "TASK", id: taskId }];
      },
    }),

    deleteComment: builder.mutation({
      query: ({ id }) => ({
        url: `task-management/task-comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { taskId }) => {
        return [{ type: "TASK", id: taskId }];
      },
    }),

    createSubTask: builder.mutation({
      query: ({ taskId, ...data }) => ({
        url: `/task-management/sub-tasks/${taskId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { taskId }) => {
        return [{ type: "TASK", id: taskId }];
      },
    }),

    toggleSubTask: builder.mutation({
      query: ({ subTaskId, ...data }) => ({
        url: `/task-management/sub-tasks/${subTaskId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { taskId }) => {
        return [{ type: "TASK", id: result.task_id }];
      },
    }),

    updateName: builder.mutation({
      query: ({ taskId, name }) => ({
        url: `/task-management/tasks/${taskId}/update-name`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: (result, error, { taskId }) => {
        return [{ type: "TASK", id: taskId }];
      },
    }),

    setPriority: builder.mutation({
      query: ({ taskId, priority }) => ({
        url: `/task-management/tasks/${taskId}/set-priority`,
        method: "PATCH",
        body: { priority },
      }),
      invalidatesTags: (result, error, { taskId }) => {
        return [{ type: "TASK", id: taskId }, "BOARDS"];
      },
    }),

    setDescription: builder.mutation({
      query: ({ taskId, description }) => ({
        url: `/task-management/tasks/${taskId}/set-description`,
        method: "PATCH",
        body: { description },
      }),
      invalidatesTags: (result, error, { taskId }) => {
        return [{ type: "TASK", id: taskId }];
      },
    }),

    setDueDate: builder.mutation({
      query: ({ taskId, dueDate }) => ({
        url: `/task-management/tasks/${taskId}/set-due-date`,
        method: "PATCH",
        body: { due_date: dueDate },
      }),
      invalidatesTags: (result, error, { taskId }) => {
        return [{ type: "TASK", id: taskId }];
      },
    }),

    setReporter: builder.mutation({
      query: ({ taskId, reporter_id }) => ({
        url: `/task-management/tasks/${taskId}/set-reporter`,

        method: "PATCH",
        body: { reporter_id },
      }),

      invalidatesTags: (result, error, { taskId }) => {
        return [{ type: "TASK", id: taskId }];
      },
    }),

    setAttachment: builder.mutation({
      query: ({ taskId, body }) => ({
        url: `/task-management/tasks/${taskId}/set-attachment`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { taskId }) => {
        return [{ type: "TASK", id: taskId }];
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
  useCreateSubTaskMutation,
  useToggleSubTaskMutation,
  useSetPriorityMutation,
  useSetDescriptionMutation,
  useSetDueDateMutation,
  useSetReporterMutation,
  useSetAttachmentMutation,
  useUpdateNameMutation,
  useDeleteCommentMutation,
} = taskManagementService;

export default taskManagementService;
