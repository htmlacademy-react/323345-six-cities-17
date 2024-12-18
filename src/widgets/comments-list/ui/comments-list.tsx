import { Comment } from '../../../entities/comment';
import { OfferSendForm } from '../../../pages/offer-page/ui/components/offer-send-form';
import { UseAppSelector } from '../../../shared/hooks/use-app-selector';
import { CommentType } from '../../../shared/types/comment-type';
import { OfferType } from '../../../shared/types/types';

type CommentsListProps = {
  offer: OfferType;
  commentsList: CommentType[];
};

export function CommentsList({ offer, commentsList }: CommentsListProps) {
  const isAuthenticated = UseAppSelector((state) => state.auth);
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
      {isAuthenticated && <OfferSendForm />}
    </section>
  );
}
