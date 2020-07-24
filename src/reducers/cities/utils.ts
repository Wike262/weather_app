import * as types from '../../types';

let nextCityId = 0;

function updateItemInArray(array: Array<types.City>, id: number, updateItemCallback: Function) {
	const updatedItems = array.map((item: types.City) => {
		if (item.id !== id) {
			return item;
		}
		const updatedItem = updateItemCallback(item);
		return updatedItem;
	});

	return updatedItems;
}

function updateObject(oldObject: {}, newValues: {}) {
	return Object.assign({}, oldObject, newValues);
}

export function requestData(state: Array<types.City>, action: types.RequestWeather) {
	let id = action.payload.id!;
	return updateItemInArray(state, id, (city: types.City) => {
		return updateObject(city, { isFetching: true });
	});
}

export function requestNewCityData(state: Array<types.City>, action: types.RequesNewCityWeather) {
	return [
		...state,
		{
			isFetching: true,
			isCurrent: true,
			isFavorit: false,
			cityName: action.payload.cityName,
			id: nextCityId++,
			weatherInfo: null,
		},
	];
}

export function receiveData(state: Array<types.City>, action: types.ReceiveWeather) {
	let id = action.payload.id;
	return updateItemInArray(state, id, (city: types.City) => {
		return updateObject(city, { isFetching: false, weatherInfo: action.payload.weatherInfo });
	});
}

export function receiveNewCityData(state: Array<types.City>, action: types.ReceiveNewCityWeather) {
	return state.map((item, index) => {
		return index === state.length - 1 ? { ...item, isFetching: false, weatherInfo: action.payload.weatherInfo } : item;
	});
}

export function setCurrent(state: Array<types.City>, action: types.SetCurrentCity) {
	return updateItemInArray(state, action.payload.id!, (city: types.City) => {
		return updateObject(city, { isCurrent: true });
	});
}

export function removeCurrent(state: Array<types.City>, action: types.RemoveCurrentCity) {
	let id = state.findIndex((item) => item.id === action.payload.id!);
	if (state[id].isFavorit) {
		return state.map((item) => {
			return item.id === action.payload.id ? { ...item, isCurrent: false } : item;
		});
	} else {
		return [...state.slice(0, id), ...state.slice(id + 1)];
	}
}

export function setFavoriteCities(state: Array<types.City>, action: types.SetFavoriteCities) {
	return action.payload.cities.map((item) => {
		return {
			isFetching: false,
			cityName: item,
			isCurrent: false,
			isFavorit: true,
			id: nextCityId++,
			weatherInfo: null,
		};
	});
}
