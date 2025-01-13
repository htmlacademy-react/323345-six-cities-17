import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCommentsAction, sendCommentAction } from '../../action/async-action';
import { CommentType } from '../../../shared/types';
import { InitialCommentsType } from './initial-comments-type';

const initialState: InitialCommentsType = {
  comments: [],
  isLoading: false,
  error: false,
};

export const commentsSlice = createSlice({
  name: 'commentsSlice',
  initialState,
  reducers: {
    loadComments: (state, { payload }: PayloadAction<CommentType[]>) => {
      state.comments = payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, { payload }: PayloadAction<CommentType[]>) => {
        state.isLoading = false;
        state.error = false;
        state.comments = payload;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
        state.comments = [];
      })
      .addCase(sendCommentAction.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(sendCommentAction.fulfilled, (state) => {
        state.isLoading = false;
        state.error = false;
      })
      .addCase(sendCommentAction.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  }
});
