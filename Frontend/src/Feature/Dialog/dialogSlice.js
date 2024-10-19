import { createSlice } from "@reduxjs/toolkit";

const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    open: false,
  },
  reducers: {
    openDialog: (state, action) => {
      state.open = true;
    },
    closeDialog: (state) => {
      state.open = false;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;

export const selectDialogOpen = (state) => state.dialog.open;

export default dialogSlice.reducer;
