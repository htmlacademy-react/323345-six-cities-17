import { Comment } from '../../../entities/comment';
import { OfferSendForm } from '../../../pages/offer-page/ui/components/offer-send-form';
import { useAppSelector } from '../../../shared/hooks/use-app-selector';
import { OfferType } from '../../../shared/types';
import { authSelector } from '../../../store/selectors/auth-selector';
import { AuthStatus } from '../../../shared/consts/auth-status';
import { useAppDispatch } from '../../../shared/hooks/use-app-dispatch';
import { useEffect } from 'react';
import { fetchCommentsAction } from '../../../store/action/async-action';
import { loadCommentsSelector } from '../../../store/selectors/load-comments-selector';

type CommentsListProps = {
  offer: OfferType;
  offerId: string;
};

export function CommentsList({ offer, offerId }: CommentsListProps) {
  const isAuthenticated = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCommentsAction(offerId));
  }, [dispatch, offerId]);
  const commentsList = useAppSelector(loadCommentsSelector);
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{commentsList.length}</span>
      </h2>
      <ul className="reviews__list">
        {commentsList.length !== 0 &&
          commentsList.map((comment) => (
            <Comment offer={offer} commentData={comment} key={comment.id} />
          ))}
      </ul>
      {isAuthenticated === AuthStatus.Auth && <OfferSendForm offerId={offerId} />}
    </section>
  );
}
