import * as consts from '../constants';
import * as types from '../types';
import { ThunkDispatch } from 'redux-thunk';

export type CityActions =
	| types.RequestWeather
	| types.ReceiveWeather
	| types.SetCurrentCity
	| types.RemoveCurrentCity
	| types.SetFavoriteCities;

export const requestWeather = (cityName: string, id: number) => ({
	type: consts.REQUEST_WEATHER,
	payload: {
		cityName,
		id,
	},
});

export const receiveWeather = (cityName: string, id: number, json: types.WeatherInfo | types.Error) => ({
	type: consts.RECEIVE_WEATHER,
	payload: {
		cityName: cityName,
		weatherInfo: json,
		id,
	},
});

const fetchCity = (cityName: string, id?: number) => (dispatch: ThunkDispatch<{}, {}, any>) => {
	console.log(id);
	dispatch(requestWeather(cityName, id!));
	return fetch(
		`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=en&appid=${process.env.REACT_APP_API_KEY}`
	)
		.then((response) => response.json())
		.then((json) => dispatch(receiveWeather(cityName, id!, json)))
		.catch((error) => dispatch(receiveWeather(cityName, id!, error)));
};

const shouldFetch = (state: types.StoreState, id?: number) => {
	if (id !== undefined) {
		let cities = state.cities[id];
		if (!cities?.isFetching) {
			return true;
		} else return false;
	} else {
		let cities = state.cities[state.cities.length];
		if (!cities?.isFetching) {
			return true;
		} else return false;
	}
};

export const fetchCityIfNeeded = (cityName: string, id?: number) => (
	dispatch: ThunkDispatch<{}, {}, any>,
	getState: Function
) => {
	if (shouldFetch(getState(), id)) {
		return dispatch(fetchCity(cityName, id));
	}
};

export const setCurrentCity = (cityName: string, city: types.City) => ({
	type: consts.SET_CURRENT_CITY,
	payload: {
		cityName,
		city,
	},
});

export const setFavoriteCities = (cities: Array<string>) => ({
	type: consts.SET_FAVORITE_CITIES,
	payload: {
		cities,
	},
});

export const removeCurrentCity = (id: number) => ({
	type: consts.REMOVE_CURRENT_CITY,
	payload: { id },
});
