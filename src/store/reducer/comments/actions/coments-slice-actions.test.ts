import { createAPI } from '../../../../api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { datatype } from 'faker';
import {
  AppThunkDispatch,
  extractActionsType,
} from '../../../../shared/utils/mocks-for-tests/mock-for-tests';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppState } from '../../../types/app-state';
import {
  fetchCommentsAction,
  sendCommentAction,
} from './comments-slice-actions';
import { APIRoute } from '../../../../shared/consts';
import { SendFormType } from '../../../../shared/types';

describe('comments-slice-actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    AppState,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      commentsSlice: {
        comments: [],
      },
    });
  });

  const mockOfferId = datatype.uuid();
  const mockComments = {
    id: '8a76a0b0-44ac-4ad6-8009-9ca1f49bbdd2',
    comment:
      'The house is very good, very happy, hygienic and simple living conditions around it are also very good. I hope to have the opportunity to come back. Thank you.',
    date: '2025-01-01T21:00:00.071Z',
    rating: 5,
    user: {
      name: 'Max',
      avatarUrl: 'https://16.design.htmlacademy.pro/static/avatar/3.jpg',
      isPro: false,
    },
  };

  describe('fetchCommentsAction', () => {
    it('should dispatch "fetchCommentsAction.pending" and "fetchCommentsAction.fulfilled" when server response 200', async () => {
      mockAxiosAdapter
        .onGet(`${APIRoute.Comments}/${mockOfferId}`)
        .reply(200, mockComments);

      await store.dispatch(fetchCommentsAction(mockOfferId));

      const emittedActions = store.getActions();
      const extractedActionsType = extractActionsType(emittedActions);
      const fetchCommentsActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchCommentsAction.fulfilled
      >;
      expect(extractedActionsType).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.fulfilled.type,
      ]);

      expect(fetchCommentsActionFulfilled.payload).toEqual(mockComments);
    });

    it('should dispatch "fetchCommentsAction.pending" and "fetchCommentsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter
        .onGet(`${APIRoute.Comments}/${mockOfferId}`)
        .reply(400, []);

      await store.dispatch(fetchCommentsAction(mockOfferId));

      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.rejected.type,
      ]);
    });
  });

  describe('sendCommentAction', () => {
    const mockFormData: SendFormType = {
      comment:
        'The house is very good, very happy, hygienic and simple living conditions around it are also very good. I hope to have the opportunity to come back. Thank you.',
      rating: 4,
    };

    it('should dispatch "sendCommentAction.pending" and "sendCommentAction.fullfilled" when server response 200', async () => {
      mockAxiosAdapter
        .onPost(`${APIRoute.Comments}/${mockOfferId}`, mockFormData)
        .reply(200, mockComments);

      await store.dispatch(
        sendCommentAction({ offerId: mockOfferId, formData: mockFormData })
      );

      const emittedActions = store.getActions();
      const extractedActionsType = extractActionsType(emittedActions);
      const sendCommentActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof sendCommentAction.fulfilled
      >;

      expect(extractedActionsType).toEqual([
        sendCommentAction.pending.type,
        sendCommentAction.fulfilled.type,
      ]);

      expect(sendCommentActionFulfilled.payload).toEqual(mockComments);
    });

    it('should dispatch "sendCommentAction.pending" and "sendCommentAction.rejected" when server response 400', async () => {
      mockAxiosAdapter
        .onPost(`${APIRoute.Comments}/${mockOfferId}`, mockFormData)
        .reply(400, []);

      await store.dispatch(
        sendCommentAction({ offerId: mockOfferId, formData: mockFormData })
      );

      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        sendCommentAction.pending.type,
        sendCommentAction.rejected.type,
      ]);
    });
  });
});
