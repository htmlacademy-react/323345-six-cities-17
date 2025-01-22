import { memo, useEffect } from 'react';

import { Comment } from '../../../entities/comment';
import OfferSendForm from '../../offer-send-form/ui/offer-send-form';
import { useAppSelector } from '../../../shared/hooks/use-app-selector';
import { AuthStatus } from '../../../shared/consts/auth-status';
import { useAppDispatch } from '../../../shared/hooks/use-app-dispatch';
import { selectAuthorizationStatus } from '../../../store/reducer/user/selectors/select-authorization-status';
import { selectLoadComments } from '../../../store/reducer/comments/selectors/select-load-comments';
import { fetchCommentsAction } from '../../../store/reducer/comments/actions/comments-slice-actions';

type CommentsListProps = {
  offerId: string;
};

function CommentsListTemplate({ offerId }: CommentsListProps) {
  const isAuthenticated = useAppSelector(selectAuthorizationStatus);
  const dispatch = useAppDispatch();
  const commentsListData = useAppSelector(selectLoadComments);
  const commentsList = commentsListData.slice(-10).reverse();

  useEffect(() => {
    dispatch(fetchCommentsAction(offerId));
  }, [dispatch, offerId]);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{commentsListData.length}</span>
      </h2>
      {commentsList && commentsList.length !== 0 &&
        <ul className="reviews__list">
          {commentsList.map((comment) => (
            <Comment commentData={comment} key={comment.id} />
          ))}
        </ul>}
      {isAuthenticated === AuthStatus.Auth && <OfferSendForm offerId={offerId} />}
    </section>
  );
}
const CommentsList = memo(CommentsListTemplate);

export default CommentsList;
