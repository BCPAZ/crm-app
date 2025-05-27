import { createSlice } from "@reduxjs/toolkit";
import taskManagementService from "../services/taskManagementService";

const kanbanSlice = createSlice({
  name: "kanban",
  initialState: {
    boards: [],
    deletedBoards: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      taskManagementService.endpoints.getBoards.matchFulfilled,
      (state, action) => {
        state.boards = action.payload;
      }
    );

    // Create Board Pending
    builder.addMatcher(
      taskManagementService.endpoints.createBoard.matchPending,
      (state, action) => {
        state.boards.push({
          id: action.meta.requestId,
          name: action.meta.arg.originalArgs.name,
          position: state.boards.length,
          tasks: [],
        });
      }
    );

    // Create Board Rejected
    builder.addMatcher(
      taskManagementService.endpoints.createBoard.matchRejected,
      (state, action) => {
        state.boards = state.boards.filter(
          (board) => board.id !== action.meta.requestId
        );
      }
    );

    // Create Board Fulfilled
    builder.addMatcher(
      taskManagementService.endpoints.createBoard.matchFulfilled,
      (state, action) => {
        state.boards = state.boards.map((board) => {
          if (board.id === action.meta.requestId) {
            return {
              ...board,
              id: action.payload.id,
              position: action.payload.position,
            };
          }
          return board;
        });
      }
    );

    // Delete Board Pending
    builder.addMatcher(
      taskManagementService.endpoints.deleteBoard.matchPending,
      (state, action) => {
        const board = state.boards.find(
          (board) => board.id === action.meta.arg.originalArgs
        );
        if (board) {
          state.deletedBoards.push(board);
        }
        state.boards = state.boards.filter(
          (board) => board.id !== action.meta.arg.originalArgs
        );
      }
    );

    // Delete Board Fulfilled
    builder.addMatcher(
      taskManagementService.endpoints.deleteBoard.matchFulfilled,
      (state, action) => {
        state.deletedBoards = state.deletedBoards.filter(
          (board) => board.id !== action.meta.arg.originalArgs
        );
      }
    );

    // Delete Board Rejected
    builder.addMatcher(
      taskManagementService.endpoints.deleteBoard.matchRejected,
      (state, action) => {
        const board = state.deletedBoards.find(
          (board) => board.id === action.meta.arg.originalArgs
        );
        if (board) {
          state.boards.push(board);
        }
        state.deletedBoards = state.deletedBoards.filter(
          (board) => board.id !== action.meta.arg.originalArgs
        );
      }
    );

    // Update Board Pending
    builder.addMatcher(
      taskManagementService.endpoints.updateBoard.matchPending,
      (state, action) => {
        state.boards = state.boards.map((board) => {
          if (board.id === action.meta.arg.originalArgs.id) {
            return {
              ...board,
              oldName: board.name,
              name: action.meta.arg.originalArgs.data.name,
            };
          }
          return board;
        });
      }
    );

    // Update Board Rejected
    builder.addMatcher(
      taskManagementService.endpoints.updateBoard.matchRejected,
      (state, action) => {
        state.boards = state.boards.map((board) => {
          if (board.id === action.meta.arg.originalArgs.id) {
            return {
              ...board,
              name: board.oldName,
            };
          }
          return board;
        });
      }
    );

    // Change Board Position Pending
    builder.addMatcher(
      taskManagementService.endpoints.changeBoardPosition.matchPending,
      (state, action) => {
        const { old_position: oldPosition, new_position: newPosition } =
          action.meta.arg.originalArgs;

        const updateBoardPosition = (board) => {
          if (
            (oldPosition < newPosition &&
              board.position > oldPosition &&
              board.position <= newPosition) ||
            (oldPosition > newPosition &&
              board.position < oldPosition &&
              board.position >= newPosition)
          ) {
            return {
              ...board,
              oldPosition: board.position,
              position:
                oldPosition < newPosition
                  ? board.position - 1
                  : board.position + 1,
            };
          } else if (board.position === oldPosition) {
            return {
              ...board,
              oldPosition: board.position,
              position: newPosition,
            };
          }
          return board;
        };

        state.boards = sortBoardsByPosition(
          state.boards.map(updateBoardPosition)
        );
      }
    );

    // Change Board Position Rejected
    builder.addMatcher(
      taskManagementService.endpoints.changeBoardPosition.matchRejected,
      (state, action) => {
        state.boards = sortBoardsByPosition(
          state.boards.map((board) => {
            if (board.id === action.meta.arg.originalArgs.id) {
              return {
                ...board,
                position: board.oldPosition,
              };
            }
            return board;
          })
        );
      }
    );

    // Create Task Pending
    builder.addMatcher(
      taskManagementService.endpoints.createTask.matchPending,
      (state, action) => {
        const { id, data } = action.meta.arg.originalArgs;
        const requesId = action.meta.requestId;
        state.boards = state.boards.map((board) => {
          if (board.id == id) {
            return {
              ...board,
              tasks: [
                {
                  id: requesId,
                  name: data.name,
                  position: 0,
                  priority: "MEDIUM",
                  due_date: null,
                  description: null,
                  comments_count: 0,
                  attachments_count: 0,
                  appointed_users: [],
                },
                ...board.tasks?.map((task) => ({
                  ...task,
                  position: task.position + 1,
                })),
              ],
            };
          }
          return board;
        });
      }
    );

    // Create Task Rejected
    builder.addMatcher(
      taskManagementService.endpoints.createTask.matchRejected,
      (state, action) => {
        const { id } = action.meta.arg.originalArgs;
        const requesId = action.meta.requestId;
        state.boards = state.boards.map((board) => {
          if (board.id == id) {
            return {
              ...board,
              tasks: board.tasks.filter((task) => task.id !== requesId),
            };
          }
          return board;
        });
      }
    );

    // Create Task Fulfilled
    builder.addMatcher(
      taskManagementService.endpoints.createTask.matchFulfilled,
      (state, action) => {
        const { id } = action.meta.arg.originalArgs;
        const requestId = action.meta.requestId;
        state.boards = state.boards.map((board) => {
          if (board.id == id) {
            return {
              ...board,
              tasks: board.tasks.map((task) => {
                if (task.id == requestId) {
                  return {
                    ...task,
                    ...action.payload,
                  };
                }
                return task;
              }),
            };
          }
          return board;
        });
      }
    );

    builder.addMatcher(
      taskManagementService.endpoints.changeTaskPosition.matchPending,
      (state, action) => {
        const { board_id, task_id, position, source_board_id } =
          action.meta.arg.originalArgs;

        const boards = [...state.boards];

        const sourceTask = state.boards
          ?.find((board) => board.id == source_board_id)
          ?.tasks?.find((task) => task.id == task_id);

        if (source_board_id == board_id) {
          state.boards = boards.map((board) => {
            if (board.id == board_id) {
              const tasks = [
                ...board.tasks?.filter((task) => task.id != task_id),
              ];
              const lastTasks = tasks
                .splice(position, tasks.length + 1)
                .filter((task) => task.id != task_id);
              return {
                ...board,
                tasks: [...tasks.splice(0, position), sourceTask, ...lastTasks],
              };
            }
            return board;
          });

          return;
        }

        state.boards = state.boards.map((board) => {
          if (board.id == board_id) {
            const lastTasks = [
              ...board.tasks.splice(position, board.tasks.length + 1),
            ];
            return {
              ...board,
              tasks: [
                ...board.tasks.splice(0, position),
                sourceTask,
                ...lastTasks,
              ],
            };
          }

          if (board.id == source_board_id) {
            return {
              ...board,
              tasks: sortBoardsByPosition(
                board.tasks.filter((task) => task.id != task_id)
              ),
            };
          }

          return board;
        });
      }
    );
  },
});

function sortBoardsByPosition(boards) {
  return boards.sort((a, b) => a.position - b.position);
}

export default kanbanSlice;
