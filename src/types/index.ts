import * as consts from '../constants';

export interface WeatherInfo {
	weather: any;
	id: number;
	name: string;
	cod: number;
	state: string | null;
	main: any;
	wind: any;
	country: string;
	coord: {
		lon: number;
		lat: number;
	};
}

export interface StoreState {
	cities: Array<City>;
}

export interface Error {
	cod: string;
	message: string;
}

export interface City {
	isFetching: boolean;
	isCurrent: boolean;
	isFavorit: boolean;
	id: number;
	cityName: string;
	weatherInfo: WeatherInfo;
}

export interface RequestWeather {
	type: consts.REQUEST_WEATHER;
	payload: {
		cityName: string;
		id?: number;
	};
}

export interface ReceiveWeather {
	type: consts.RECEIVE_WEATHER;
	payload: {
		cityName: string;
		weatherInfo: WeatherInfo;
		id: number;
	};
}

export interface SetFavoriteCities {
	type: consts.SET_FAVORITE_CITIES;
	payload: {
		cities: Array<string>;
	};
}

export interface SetCurrentCity {
	type: consts.SET_CURRENT_CITY;
	payload: {
		cityName: string;
		city: WeatherInfo;
		id: number;
	};
}

export interface RemoveCurrentCity {
	type: consts.REMOVE_CURRENT_CITY;
	payload: { id: number };
}
