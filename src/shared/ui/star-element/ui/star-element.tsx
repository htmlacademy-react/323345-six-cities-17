type StarType = {
  value: number;
  formChangeHandle: (rating: number) => void;
  isChecked: boolean;
  isdisabled: boolean;
}

function StarElement({ value, formChangeHandle, isChecked, isdisabled }: StarType) {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={`${value}`}
        id={`${value}-stars`}
        type="radio"
        onChange={() => formChangeHandle(value)}
        checked={isChecked}
        disabled={isdisabled}
        data-testid="star-container"
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

export default StarElement;
