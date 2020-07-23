import * as types from '../types';
import { favortisCityActions } from '../actions';
export function getFavoritsCitys() {
	var values = [],
		keys = Object.keys(localStorage),
		i = keys.length;

	while (i--) {
		values.push({
			cityName: localStorage.getItem(keys[i])!,
			isFetching: false,
			weatherInfo: { weather: null, id: 0, name: '', state: null, country: '', coord: { lon: 0, lat: 0 } },
		});
	}
	return values;
}

export function request(state: Array<types.city>, action: favortisCityActions) {
	let updatedState = state.slice();
	updatedState[action.payload.id].isFetching = true;
	return updatedState;
}

export function receive(state: Array<types.city>, action: favortisCityActions) {
	let updatedState = state.slice();
	if ('city' in action.payload) {
		updatedState[action.payload.id].weatherInfo.weather = action.payload.city;
		updatedState[action.payload.id].isFetching = false;
		return updatedState;
	}
	return state;
}
