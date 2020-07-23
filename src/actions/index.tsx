import * as consts from '../constants';
import * as types from '../types';

export type currentCityActions =
	| types.requestCityWeather
	| types.receiveCityWeather
	| types.setCurrentCity
	| types.removeCurrentCity;

export type favortisCityActions = types.requestFavoritsCityWeather | types.receiveCityFavoritsWeather;

export const requestCityWeather = (cityName: string) => ({
	type: consts.REQUEST_WEATHER,
	payload: {
		cityName,
	},
});

export const receiveCityWeather = (cityName: string, json: types.cityInfo) => ({
	type: consts.RECEIVE_WEATHER,
	payload: {
		cityName: cityName,
		city: json,
	},
});

const fetchCity = (cityName: string) => (dispatch: any) => {
	dispatch(requestCityWeather(cityName));
	return fetch(
		`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=en&appid=${process.env.REACT_APP_API_KEY}`
	)
		.then((response) => response.json())
		.then((json) => dispatch(receiveCityWeather(cityName, json)));
};

const shouldFetchCity = (state: any, cityName: string) => {
	const posts = state.currentCity;
	if (posts.weatherInfo.weather === null) {
		if (!posts.isFetching) {
			return true;
		} else return false;
	} else return false;
};

export const fetchCityIfNeeded = (cityName: string) => (dispatch: any, getState: any) => {
	if (shouldFetchCity(getState(), cityName)) {
		return dispatch(fetchCity(cityName));
	}
};

export const setCurrentCity = (cityName: string, city: any) => ({
	type: consts.SET_CURRENT_CITY,
	payload: {
		cityName,
		city,
	},
});

export const removeCurrentCity = () => ({
	type: consts.REMOVE_CURRENT_CITY,
});

export const requestFavoritsCityWeather = (cityName: string, id: number) => ({
	type: consts.REQUEST_WEATHER_FAVORITS,
	payload: {
		cityName,
		id,
	},
});

export const receiveCityFavoritsWeather = (cityName: string, id: number, json: types.cityInfo) => ({
	type: consts.RECEIVE_WEATHER_FAVORITS,
	payload: {
		id,
		cityName,
		city: json,
	},
});

const fetchFavoritsCity = (cityName: string, id: number) => (dispatch: any) => {
	dispatch(requestFavoritsCityWeather(cityName, id));
	return fetch(
		`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=en&appid=${process.env.REACT_APP_API_KEY}`
	)
		.then((response) => response.json())
		.then((json) => dispatch(receiveCityFavoritsWeather(cityName, id, json)));
};

const shouldFetchFavoritsCity = (state: any, cityName: string, id: number) => {
	const posts = state.favoritsCitys[id];
	if (posts.weatherInfo && posts.weatherInfo.weather === null) {
		if (!posts.isFetching) {
			return true;
		} else return false;
	} else return false;
};

export const fetchFavoritsCityIfNeeded = (cityName: string, id: number) => (dispatch: any, getState: any) => {
	if (shouldFetchFavoritsCity(getState(), cityName, id)) {
		return dispatch(fetchFavoritsCity(cityName, id));
	}
};
