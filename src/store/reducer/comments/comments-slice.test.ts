import {
  fetchCommentsAction,
  sendCommentAction,
} from './actions/comments-slice-actions';
import { commentsSlice } from './comments-slice';

describe('commentsSlice', () => {
  const expectedState = { comments: [], isLoading: false };
  const mockComment = {
    id: 'f0d2d561-1804-4299-9f36-9d28e2d7ba87',
    comment:
      'This villa is perfect in every way: the view on mountains and waterfalls, the hot tub and the villa itself. The evening here became a great continuation of our journeys over country.',
    date: '2025-01-04T21:00:00.042Z',
    rating: 2,
    user: {
      name: 'Mollie',
      avatarUrl: 'https://16.design.htmlacademy.pro/static/avatar/1.jpg',
      isPro: false,
    },
  };

  describe('should return initial state whith empty action and undefined state', () => {
    const emptyAction = { type: '' };
    it('should return initial state when empty action', () => {
      const result = commentsSlice.reducer(expectedState, emptyAction);
      expect(expectedState).toEqual(result);
    });

    it('should return default initial state whith empty action and undefined state', () => {
      const result = commentsSlice.reducer(undefined, emptyAction);
      expect(expectedState).toEqual(result);
    });
  });

  describe('checks the validity of "fetchCommentsAction" in pending, fulfilled, rejected state', () => {
    it('should set "isLoading" to "true" with "fetchCommentsAction.pending" ', () => {
      const expectedState = { comments: [], isLoading: true };
      const result = commentsSlice.reducer(
        expectedState,
        fetchCommentsAction.pending
      );
      expect(expectedState).toEqual(result);
    });

    it('should set "mockComment" to array with "comments" and set "isLoading" to "false" with "fetchCommentsAction.fulfilled" ', () => {
      const expectedState = { comments: [mockComment], isLoading: false };
      const result = commentsSlice.reducer(
        undefined,
        fetchCommentsAction.fulfilled(
          [mockComment],
          '',
          'this plase for offerId'
        )
      );
      expect(expectedState).toEqual(result);
    });

    it('should set "isLoading" to "false" with "fetchCommentsAction.rejected" ', () => {
      const result = commentsSlice.reducer(
        undefined,
        fetchCommentsAction.rejected
      );
      expect(expectedState).toEqual(result);
    });
  });

  describe('checks the validity of "sendCommentAction" in pending, fulfilled, rejected state', () => {
    it('should set "isLoading" to "true" with "fetchCommentsAction.pending"', () => {
      const expectedState = { comments: [], isLoading: true };
      const result = commentsSlice.reducer(
        expectedState,
        sendCommentAction.pending
      );
      expect(expectedState).toEqual(result);
    });

    it('should set "mockComment" to array with "comments" and set "isLoading" to "false" with "sendCommentAction.fulfilled"', () => {
      const expectedState = { comments: [mockComment], isLoading: false };
      const result = commentsSlice.reducer(
        undefined,
        fetchCommentsAction.fulfilled(
          [mockComment],
          '',
          'this plase for offerId'
        )
      );
      expect(expectedState).toEqual(result);
    });

    it('should set "isLoading" to "false" with "fetchCommentsAction.rejected"', () => {
      const result = commentsSlice.reducer(
        undefined,
        sendCommentAction.rejected
      );
      expect(expectedState).toEqual(result);
    });
  });
});
