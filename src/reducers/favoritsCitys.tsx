import * as consts from '../constants';
import { getFavoritsCitys, request, receive } from './utilsFavorits';
import { favortisCityActions } from '../actions';
import * as types from '../types';

const initialeState = getFavoritsCitys();

export default (state: Array<types.city> = initialeState, action: favortisCityActions): Array<types.city> => {
	switch (action.type) {
		case consts.REQUEST_WEATHER_FAVORITS:
			return request(state, action);
		case consts.RECEIVE_WEATHER_FAVORITS:
			return receive(state, action);
		default:
			return state;
	}
};
