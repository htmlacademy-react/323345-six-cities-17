import { CommentType } from '../../../shared/types/types/comment-type';
import { getPercentFromRating } from '../../../shared/utils/percent-from-rating/percent-from-rating';
import { getDateToComment } from '../utils/get-date-to-comment';

type CommentProps = {
  commentData: CommentType;
};
function Comment({ commentData }: CommentProps) {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={commentData.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{commentData.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span
              style={{
                width: getPercentFromRating(commentData.rating),
              }}
            />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{commentData.comment}</p>
        <time className="reviews__time" dateTime="2019-04-24">
          {getDateToComment(commentData.date)}
        </time>
      </div>
    </li>
  );
}

export default Comment;
