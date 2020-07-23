import * as types from '../types';
import { currentCityActions } from '../actions';

export function request(state: types.city, action: currentCityActions) {
	let updatedState = Object.assign({}, state);
	updatedState.isFetching = true;
	return updatedState;
}
export function receive(state: types.city, action: currentCityActions) {
	let updatedState = Object.assign({}, state);
	if ('city' in action.payload) {
		updatedState.weatherInfo = action.payload.city;
		updatedState.isFetching = false;
		return updatedState;
	}
	return state;
}
export function set(state: types.city, action: currentCityActions) {
	let updatedState = Object.assign({}, state);
	if ('city' in action.payload) {
		updatedState.weatherInfo = action.payload.city.weather;
		updatedState.cityName = action.payload.cityName;
		updatedState.isFetching = false;
		return updatedState;
	}
	return state;
}
