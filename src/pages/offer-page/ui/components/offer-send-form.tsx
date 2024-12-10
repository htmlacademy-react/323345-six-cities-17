import {FormEvent, useState} from 'react';
import {StarElement} from './star-element';
import {SendFormType} from '../../../../shared/types/send-form-type';
import {StarCount} from '../../../../shared/consts/star-count';
import {INITIAL_SEND_FORM_STATE} from '../../../../shared/consts/Initial-send-form-state';
import {MIN_COMMENTS_LENGTH, MAX_COMMENTS_LENGTH} from '../../consts/comments-length'

export function OfferSendForm() {
  const [formData, setFormData] = useState<SendFormType>(INITIAL_SEND_FORM_STATE);
  const [sendButtonDisabled, setSendButtonDisabled] = useState(true);
  const [starChecked, setStarChecked] = useState<null | number>(null);
  const onFormChangeHandle = (inputName: keyof SendFormType, value: number | string): void => {
    setFormData(
      {
        ...formData,
        [inputName]: value,
      });
    if (typeof value === 'number') {
      setStarChecked(value);
    }
    if (formData.rating && formData.review.length >= MIN_COMMENTS_LENGTH && formData.review.length < MAX_COMMENTS_LENGTH) {
      setSendButtonDisabled(false);
    } else {
      setSendButtonDisabled(true);
    }
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    setFormData(INITIAL_SEND_FORM_STATE);
    setSendButtonDisabled(true);
    setStarChecked(null);
  };
  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmitForm}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {
          StarCount.map(
            (star: number): JSX.Element => (
              <
                StarElement
                key={star}
                value={star}
                formChangeHandle={(rating) => onFormChangeHandle('rating', rating)}
                isChecked={starChecked === star}
              />
            )
          )
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={(e) => onFormChangeHandle('review', e.target.value)}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={sendButtonDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
