import * as types from '../../types';
import { CityActions } from '../../actions';

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

let nextCityId = 0;

export function requestData(state: Array<types.City>, action: CityActions) {
	if ('id' in action.payload && action.payload.id! !== undefined) {
		let id = action.payload.id!;
		console.log(id);
		let handler = updateItemInArray(state, id, (city: types.City) => {
			return updateObject(city, { isFetching: true });
		});
		return handler;
	}
	return [...state, { isFetching: true, isCurrent: true, isFavorit: false, id: nextCityId++, weatherInfo: null }];
}

export function receiveData(state: Array<types.City>, action: CityActions) {
	if ('id' in action.payload) {
		if (action.payload.id !== undefined) {
			let id = action.payload.id!;
			console.log(id);
			let handler = updateItemInArray(state, id, (city: types.City) => {
				return 'weatherInfo' in action.payload
					? updateObject(city, { isFetching: false, weatherInfo: action.payload.weatherInfo })
					: city;
			});
			return handler;
		} else {
			let handler = { ...state };
			return state.map((item, index) => {
				if (index === state.length - 1) {
					return 'weatherInfo' in action.payload
						? updateObject(handler[state.length - 1], { isFetching: false, weatherInfo: action.payload.weatherInfo })
						: handler[state.length - 1];
				}
				return item;
			});
		}
	}
	return state;
}

export function setCurrent(state: Array<types.City>, action: CityActions) {
	if ('cityName' in action.payload && 'id' in action.payload)
		return updateItemInArray(state, action.payload.id!, (city: types.City) => {
			return updateObject(city, { isCurrent: true });
		});
	return state;
}

export function removeCurrent(state: Array<types.City>, action: CityActions) {
	if ('id' in action.payload) {
		let id = state.findIndex((item) => ('id' in action.payload ? item.id === action.payload.id! : false));
		let handler = [...state.slice(0, id), ...state.slice(id + 1)];
		return handler;
	}
	return state;
}

export function setFavoriteCities(state: Array<types.City>, action: CityActions) {
	if ('cities' in action.payload) {
		let handler: any = [...state];
		for (let i = 0; i <= action.payload.cities.length - 1; i++) {
			handler = handler.concat({
				isFetching: false,
				cityName: action.payload.cities[i],
				isCurrent: false,
				isFavorit: true,
				id: nextCityId++,
				weatherInfo: null,
			});
		}
		return handler;
	}
	return state;
}
