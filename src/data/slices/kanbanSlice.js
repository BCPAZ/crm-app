import { createSlice } from "@reduxjs/toolkit";
import taskManagementService from "../services/taskManagementService";

const kanbanSlice = createSlice({
  name: "kanban",
  initialState: {
    boards: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(taskManagementService.endpoints.getBoards.matchFulfilled, (state, action) => {
      state.boards = action.payload;
    });

    builder.addMatcher(taskManagementService.endpoints.createBoard.matchPending, (state, action) => {
      
    });    
  }
});

export default kanbanSlice;
