import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppState } from '../../../types/app-state';
import { CommentType, SendFormType } from '../../../../shared/types';
import { APIRoute } from '../../../../shared/consts';

const fetchCommentsAction = createAsyncThunk<
  CommentType[],
  string,
  {
    state: AppState;
    extra: AxiosInstance;
  }
>('comments/loadComments', async (id, { extra: api }) => {
  const { data } = await api.get<CommentType[]>(`${APIRoute.Comments}/${id}`);
  return data;
});

const sendCommentAction = createAsyncThunk<
  CommentType,
  { offerId: string; formData: SendFormType },
  {
    state: AppState;
    extra: AxiosInstance;
  }
>('comments/sendComment', async ({ offerId, formData }, { extra: api }) => {
  const { data } = await api.post<CommentType>(
    `${APIRoute.Comments}/${offerId}`,
    formData
  );
  return data;
});

export { fetchCommentsAction, sendCommentAction };
