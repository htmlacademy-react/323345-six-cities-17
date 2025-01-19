import { OfferType } from '../../types';
import { ResponseOfferType } from '../../types/types/response-offer-type';

export const responseToOfferTypeAdapter = (
  responseData: ResponseOfferType
): OfferType => ({
  id: responseData.id,
  title: responseData.title,
  type: <'house' | 'hotel' | 'room' | 'apartment'>responseData.type,
  price: responseData.price,
  city: {
    name: responseData.city.name,
    location: responseData.city.location,
  },
  location: {
    latitude: responseData.location.latitude,
    longitude: responseData.location.longitude,
    zoom: responseData.location.zoom,
  },
  isFavorite: responseData.isFavorite,
  isPremium: responseData.isPremium,
  rating: responseData.rating,
  previewImage: responseData.previewImage,
});
