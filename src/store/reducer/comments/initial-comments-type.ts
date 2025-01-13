import { CommentType } from '../../../shared/types';

export type InitialCommentsType = {
  comments: CommentType[];
  isLoading: boolean;
  error: boolean;
};
