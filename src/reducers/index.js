import { combineReducers } from 'redux';
import dataReducer from './DataReducer';
import AuthReducer from './AuthReducer';
import EventReducer from './EventReducer';
import GalleryReducer from './GalleryReducer';
import ProductReducer from './ProductReducer';
import ReservationReducer from './ReservationReducer';
import UserReducer from './UserReducer';

export default function getRootReducer(navReducer) {
    return combineReducers({
        nav: navReducer,
        data: dataReducer,
        auth: AuthReducer,
        events: EventReducer,
        gallery: GalleryReducer,
        product: ProductReducer,
        reservation: ReservationReducer,
        user: UserReducer
    });
}
