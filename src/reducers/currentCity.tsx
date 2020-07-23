import * as consts from '../constants';
import * as types from '../types';
import { currentCityActions } from '../actions';
import { receive, request, set } from './utilsCurrent';

const initializateState = {
	isFetching: false,
	cityName: '',
	weatherInfo: { weather: null, id: 0, name: '', state: null, country: '', coord: { lon: 0, lat: 0 } },
};
export default (state: types.city = initializateState, action: currentCityActions): types.city => {
	switch (action.type) {
		case consts.REQUEST_WEATHER:
			return request(state, action);
		case consts.RECEIVE_WEATHER:
			return receive(state, action);
		case consts.SET_CURRENT_CITY:
			return set(state, action);
		case consts.REMOVE_CURRENT_CITY:
			return initializateState;
		default:
			return state;
	}
};
