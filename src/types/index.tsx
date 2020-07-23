import * as consts from '../constants';

export interface cityInfo {
	weather: any;
	id: number;
	name: string;
	state: string | null;
	country: string;
	coord: {
		lon: number;
		lat: number;
	};
}

export interface error {
	cod: string;
	message: string;
}

export interface city {
	isFetching: boolean;
	cityName: string;
	weatherInfo: cityInfo;
}

export interface requestCityWeather {
	type: consts.REQUEST_WEATHER;
	payload: {
		cityName: string;
	};
}

export interface receiveCityWeather {
	type: consts.RECEIVE_WEATHER;
	payload: {
		cityName: string;
		city: cityInfo;
	};
}

export interface setCurrentCity {
	type: consts.SET_CURRENT_CITY;
	payload: {
		cityName: string;
		city: cityInfo;
	};
}

export interface removeCurrentCity {
	type: consts.REMOVE_CURRENT_CITY;
	payload: {};
}

export interface requestFavoritsCityWeather {
	type: consts.REQUEST_WEATHER_FAVORITS;
	payload: {
		cityName: string;
		id: number;
	};
}
export interface receiveCityFavoritsWeather {
	type: consts.RECEIVE_WEATHER_FAVORITS;
	payload: {
		cityName: string;
		id: number;
		city: cityInfo;
	};
}
