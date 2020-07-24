import * as consts from '../../constants';
import * as types from '../../types';
import { CityActions } from '../../actions';
import { receiveData, requestData, setCurrent, removeCurrent, setFavoriteCities } from './utils';

export default (state: Array<types.City> = [], action: CityActions): Array<types.City> => {
	switch (action.type) {
		case consts.REQUEST_WEATHER:
			return requestData(state, action);
		case consts.RECEIVE_WEATHER:
			return receiveData(state, action);
		case consts.SET_CURRENT_CITY:
			return setCurrent(state, action);
		case consts.SET_FAVORITE_CITIES:
			return setFavoriteCities(state, action);
		case consts.REMOVE_CURRENT_CITY:
			return removeCurrent(state, action);
		default:
			return state;
	}
};
