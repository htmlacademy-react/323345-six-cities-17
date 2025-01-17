import { Comment } from '../../../entities/comment';
import { OfferSendForm } from '../../../pages/offer-page/ui/components/offer-send-form';
import { useAppSelector } from '../../../shared/hooks/use-app-selector';
import { AuthStatus } from '../../../shared/consts/auth-status';
import { useAppDispatch } from '../../../shared/hooks/use-app-dispatch';
import { useEffect } from 'react';
import { fetchCommentsAction } from '../../../store/action/async-action';
import { selectAuthorizationStatus } from '../../../store/reducer/user/selectors/select-authorization-status';
import { selectLoadComments } from '../../../store/reducer/comments/selectors/select-load-comments';

type CommentsListProps = {
  offerId: string;
};

export function CommentsList({ offerId }: CommentsListProps) {
  const isAuthenticated = useAppSelector(selectAuthorizationStatus);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCommentsAction(offerId));
  }, [dispatch, offerId]);
  const commentsList = useAppSelector(selectLoadComments);
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{commentsList.length}</span>
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
