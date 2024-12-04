import React, {useState} from 'react';
import {StarCount} from '../../../../shared/consts/star-count';
import {StarElement} from './star.tsx';

export function OfferSendForm() {
  const [formData, setFormData] = useState<
    {
      rating: null | number;
      review: string;
    }
  >
  (
    {
      rating: null,
      review: '',
    }
  );
  const formChangeHandle = (evt: React.ChangeEvent<HTMLTextAreaElement> & React.MouseEvent<HTMLInputElement>) => setFormData(
    {
      ...formData,
      [evt.target.name]: evt.target.value
    }
  );
  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {
          StarCount.map(
            (star: number): JSX.Element => <StarElement key={star} value={star} formChangeHandle={formChangeHandle}/>
          )
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={formChangeHandle}
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
          disabled
        >
          Submit
        </button>
      </div>
    </form>
  );
}
