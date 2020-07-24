import * as consts from '../constants';
import * as types from '../types';
import { ThunkDispatch } from 'redux-thunk';

export type CityActions =
	| types.RequestWeather
	| types.ReceiveWeather
	| types.SetCurrentCity
	| types.RemoveCurrentCity
	| types.SetFavoriteCities
	| types.RequesNewCityWeather
	| types.ReceiveNewCityWeather;

export const requestWeather = (cityName: string, id: number): types.RequestWeather => ({
	type: consts.REQUEST_WEATHER,
	payload: {
		cityName,
		id,
	},
});

export const requesNewCitytWeather = (cityName: string): types.RequesNewCityWeather => ({
	type: consts.REQUEST_NEWCITY_WEATHER,
	payload: {
		cityName,
	},
});

export const receiveWeather = (
	cityName: string,
	id: number,
	json: types.WeatherInfo | types.Error
): types.ReceiveWeather => ({
	type: consts.RECEIVE_WEATHER,
	payload: {
		cityName: cityName,
		weatherInfo: json,
		id,
	},
});

export const receiveNewCityWeather = (
	cityName: string,
	id: number,
	json: types.WeatherInfo
): types.ReceiveNewCityWeather => ({
	type: consts.RECEIVE_NEWCITY_WEATHER,
	payload: {
		cityName: cityName,
		weatherInfo: json,
	},
});

export const setCurrentCity = (cityName: string, id: number, city: types.City): types.SetCurrentCity => ({
	type: consts.SET_CURRENT_CITY,
	payload: {
		cityName,
		id,
		city,
	},
});

export const setFavoriteCities = (cities: Array<string>): types.SetFavoriteCities => ({
	type: consts.SET_FAVORITE_CITIES,
	payload: {
		cities,
	},
});

export const removeCurrentCity = (id: number): types.RemoveCurrentCity => ({
	type: consts.REMOVE_CURRENT_CITY,
	payload: { id },
});

const fetchCity = (cityName: string, id?: number) => (dispatch: ThunkDispatch<{}, {}, any>) => {
	id !== undefined ? dispatch(requestWeather(cityName, id)) : dispatch(requesNewCitytWeather(cityName));
	return fetch(
		`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=en&appid=${process.env.REACT_APP_API_KEY}`
	)
		.then((response) => response.json())
		.then((json) =>
			id !== undefined
				? dispatch(receiveWeather(cityName, id!, json))
				: dispatch(receiveNewCityWeather(cityName, id!, json))
		)
		.catch((error) => dispatch(receiveWeather(cityName, id!, error)));
};

const shouldFetch = (state: types.StoreState, id?: number) => {
	let Id = id !== undefined ? id : state.cities.length - 1;
	let cities = state.cities[Id];
	if (!cities?.isFetching) {
		return true;
	} else return false;
};

export const fetchCityIfNeeded = (cityName: string, id?: number) => (
	dispatch: ThunkDispatch<{}, {}, any>,
	getState: Function
) => {
	if (shouldFetch(getState(), id)) {
		return dispatch(fetchCity(cityName, id));
	}
};
