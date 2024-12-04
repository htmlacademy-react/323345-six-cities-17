import React from 'react';

type StarType = {
  value: number;
  formChangeHandle: React.MouseEventHandler<HTMLInputElement>;
}

export function StarElement({value, formChangeHandle}: StarType) {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={`${value}`}
        id={`${value}-stars`}
        type="radio"
        onClick={formChangeHandle}
      />
      <label
        htmlFor={`${value}-stars`}
        className="reviews__rating-label form__rating-label"
        title="perfect"
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>

  );
}
