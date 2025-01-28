import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentType } from '../../../shared/types';
import { InitialCommentsType } from './index';
import { fetchCommentsAction, sendCommentAction } from './actions';

const initialState: InitialCommentsType = {
  comments: [],
  isLoading: false,
};

const commentsSlice = createSlice({
  name: 'commentsSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchCommentsAction.fulfilled,
        (state, { payload }: PayloadAction<CommentType[]>) => {
          state.isLoading = false;
          state.comments = payload;
        }
      )
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.isLoading = false;
        state.comments = [];
      })
      .addCase(sendCommentAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        sendCommentAction.fulfilled,
        (state, { payload }: PayloadAction<CommentType>) => {
          state.isLoading = false;
          state.comments = [...state.comments, payload];
        }
      )
      .addCase(sendCommentAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default commentsSlice;
