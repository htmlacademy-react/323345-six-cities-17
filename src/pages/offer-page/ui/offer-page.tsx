import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { CurrentOfferType } from '../../../shared/types';
import { RoutePath } from '../../../shared/consts/route-path';
import { capitalizeFirstLetter } from '../../../shared/utils/capitalize-first-letter/capitalize-first-letter';
import { getPercentFromRating } from '../../../shared/utils/percent-from-rating/percent-from-rating';
import { CommentsList } from '../../../widgets/comments-list';
import { useAppSelector } from '../../../shared/hooks/use-app-selector';
import { useAppDispatch } from '../../../shared/hooks/use-app-dispatch';
import { selectCurrentOffer } from '../../../store/reducer/offers/selectors/select-current-offer';
import { Loader } from '../../../shared/ui/loader';
import MapWrapped from '../../../widgets/map-wrapper/ui/map-wrapper';
import NearPointsList from '../../../widgets/near-poits-list';
import { fetchCurrentOfferAction, fetchNearPointsAction } from '../../../store/reducer/offers/actions/offers-slice-actions';
import IsFavoriteButton from '../../../widgets/is-favorite-button';

function OfferPage(): JSX.Element {
	const dispatch = useAppDispatch();
	const { offerId } = useParams();
	const currentOffer: CurrentOfferType | undefined = useAppSelector(selectCurrentOffer);
	const [loaderVisible, setLoaderVisible] = useState(true);

	useEffect(() => {
		(async () => {
			if (offerId) {
				await dispatch(fetchCurrentOfferAction(offerId));
				await dispatch(fetchNearPointsAction(offerId));
				setLoaderVisible(false);
			}
		})();
	}, [dispatch, offerId]);


	if (!currentOffer && !loaderVisible) {
		return <Navigate to={RoutePath.NOT_FOUND} />;
	}
	if (loaderVisible) {
		return <Loader />;
	}

	return (
		<div className="page page--gray page--main">
			<main className="page__main page__main--offer">
				<section className="offer">
					<div className="offer__gallery-container container">
						<div className="offer__gallery">
							{currentOffer?.images.slice(0, 6).map((image: string) => (
								<div className="offer__image-wrapper" key={crypto.randomUUID()}>
									<img
										className="offer__image"
										src={image}
										alt={`Photo ${currentOffer?.type}`}
									/>
								</div>
							))}
						</div>
					</div>
					<div className="offer__container container">
						<div className="offer__wrapper">
							{currentOffer?.isPremium && (
								<div className="offer__mark">
									<span>Premium</span>
								</div>
							)}
							<div className="offer__name-wrapper">
								<h1 className="offer__name">{currentOffer?.title}</h1>
								{offerId && currentOffer && <IsFavoriteButton offerId={offerId} isFavorite={currentOffer.isFavorite} place='Offer' />}
							</div>
							<div className="offer__rating rating">
								<div className="offer__stars rating__stars">
									<span
										style={{ width: `${getPercentFromRating(currentOffer?.rating)}%` }}
									/>
									<span className="visually-hidden">Rating</span>
								</div>
								<span className="offer__rating-value rating__value">
									{currentOffer?.rating}
								</span>
							</div>
							<ul className="offer__features">
								<li className="offer__feature offer__feature--entire">
									{currentOffer && capitalizeFirstLetter(currentOffer.type)}
								</li>
								<li className="offer__feature offer__feature--bedrooms">
									{`${currentOffer?.bedrooms} Bedrooms`}
								</li>
								<li className="offer__feature offer__feature--adults">
									{`Max ${currentOffer?.bedrooms} adults`}
								</li>
							</ul>
							<div className="offer__price">
								<b className="offer__price-value">&euro;{currentOffer?.price}</b>
								<span className="offer__price-text">&nbsp;night</span>
							</div>
							<div className="offer__inside">
								<h2 className="offer__inside-title">What&apos;s inside</h2>
								<ul className="offer__inside-list">
									{
										currentOffer?.goods.map((good) => (
											<li className="offer__inside-item" key={good}>{good}</li>
										))
									}
								</ul>
							</div>
							<div className="offer__host">
								<h2 className="offer__host-title">Meet the host</h2>
								<div className="offer__host-user user">
									<div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
										<img
											className="offer__avatar user__avatar"
											src={currentOffer?.host.avatarUrl}
											width="74"
											height="74"
											alt="Host avatar"
										/>
									</div>
									<span className="offer__user-name">{currentOffer?.host.name}</span>
									{currentOffer?.host.isPro && <span className="offer__user-status">Pro</span>}
								</div>
								<div className="offer__description">
									<p className="offer__text">{currentOffer?.description}</p>
								</div>
							</div>
							{offerId && <CommentsList offerId={offerId} />}
						</div>
					</div>
					<MapWrapped />
				</section>
				<div className="container">
					<section className="near-places places">
						<h2 className="near-places__title">
							Other places in the neighbourhood
						</h2>
						<NearPointsList />
					</section>
				</div>
			</main>
		</div >
	);
}

export default OfferPage;
