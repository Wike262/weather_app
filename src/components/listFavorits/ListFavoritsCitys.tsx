import React from 'react';
import { fetchFavoritsCityIfNeeded } from '../../actions';
import style from './ListFavoritsCitys.module.scss';
import { setCurrentCity } from '../../actions';
import { WiCelsius } from 'react-icons/wi';

const setCity = (cityName: string, city: any, dispatch: any) => {
	dispatch(setCurrentCity(cityName, city));
};

const ListFavoritisCitys = (props: any) => {
	return (
		<>
			{props.state.favoritsCitys.map((item: any, index: number) => {
				if (item.weatherInfo && !item.weatherInfo.weather) {
					props.dispatch(fetchFavoritsCityIfNeeded(item.cityName, index));
					return (
						<div key={index} className={style.City__Weather}>
							<h1>Loading</h1>
						</div>
					);
				} else
					return (
						<div
							key={item.weatherInfo.weather.name}
							onClick={() => setCity(item.weatherInfo.weather.name, item.weatherInfo, props.dispatch)}
							className={[style.City__Weather, style[`City__Weather_${item.weatherInfo.weather.weather[0].main}`]].join(' ')}
						>
							<h1 className={style.City__Weather__Name}>{item.weatherInfo.weather.name}</h1>
							<h3 className={style.City__Weather__Description}>{item.weatherInfo.weather.weather[0].description}</h3>
							<img
								src={`http://openweathermap.org/img/wn/${item.weatherInfo.weather.weather[0].icon}@2x.png`}
								alt="Weather_Icon"
							/>
							<p className={style.City__Weather__Temp}>
								{item.weatherInfo.weather.main.temp.toFixed(0)} <WiCelsius />
							</p>
						</div>
					);
			})}
		</>
	);
};

export default ListFavoritisCitys;
