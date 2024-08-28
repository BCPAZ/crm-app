  import { createSlice } from "@reduxjs/toolkit";

  const projectSlice = createSlice({
    name: "project",
    initialState: {
      project: null,
    },
    reducers: {
      setProject: (state, action) => {
        state.project = action.payload;
      },
    },
  });

  export const { setProject } = projectSlice.actions;

  export default projectSlice;
