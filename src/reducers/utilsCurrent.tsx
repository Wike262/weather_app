import * as types from '../types';
import { currentCityActions } from '../actions';

export function request(state: types.city, action: currentCityActions) {
	let updatedState = Object.assign({}, state);
	updatedState.isFetching = true;
	return updatedState;
}
export function receive(state: types.city, action: currentCityActions) {
	let updatedState3 = Object.assign({}, state);
	if ('city' in action.payload) {
		updatedState3.weatherInfo = action.payload.city;
		updatedState3.isFetching = false;
		return updatedState3;
	}
	return state;
}
export function set(state: types.city, action: currentCityActions) {
	let updatedState2 = Object.assign({}, state);
	if ('city' in action.payload) {
		updatedState2.weatherInfo = action.payload.city.weather;
		updatedState2.cityName = action.payload.cityName;
		updatedState2.isFetching = false;
		return updatedState2;
	}
	return state;
}
