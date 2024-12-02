type OffersCardProps = {
  place: string;
  previewImage: string;
}

export function OfferCardImg({ place, previewImage }:OffersCardProps):JSX.Element {
  return (
    <div className={`place-card__image-wrapper ${ place === 'main' ? 'cities__image-wrapper' : place === 'favorites' && 'favorites__image-wrapper'}`}>
      <a href="#">
        <img
          className="place-card__image"
          src={previewImage}
          width={`${place === 'main' ? '260' : place === 'favorites' && '150'}`}
          height={`${place === 'main' ? '200' : place === 'favorites' && '110'}`}
          alt="Place image"
        />
      </a>
    </div>
  );
}
