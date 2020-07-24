import React from 'react';
import { WiCelsius } from 'react-icons/wi';
import { City } from '../../types';
import style from './ListFavoriteCities.module.scss';

interface Props {
	state: Array<City>;
	setCity: Function;
	getCity: Function;
	setFavoriteCities: Function;
	FavoriteCities: Array<string>;
}

const ListFavoritisCitys = ({ state, setCity, getCity, setFavoriteCities, FavoriteCities }: Props) => {
	if (state.length === 0 && FavoriteCities.length > 0) {
		setFavoriteCities(FavoriteCities);
	}

	return (
		<>
			{state.map((item: City, index: number) => {
				if (!item.weatherInfo) {
					getCity(item.cityName, index);
					return (
						<div key={index} className={style.City__Weather}>
							<h1>Loading</h1>
						</div>
					);
				} else {
					if (item.weatherInfo?.cod !== 200) {
						return (
							<div key={Math.random()}>
								<h1>Not found! Sorry)</h1>{' '}
							</div>
						);
					} else {
						return (
							<div
								key={item.weatherInfo.name}
								onClick={() => setCity(item.weatherInfo!.name, item.id, item.weatherInfo)}
								className={[style.City__Weather, style[`City__Weather_${item.weatherInfo.weather[0].main}`]].join(' ')}
							>
								<h1 className={style.City__Weather__Name}>{item.weatherInfo.name}</h1>
								<h3 className={style.City__Weather__Description}>{item.weatherInfo.weather[0].description}</h3>
								<img src={`http://openweathermap.org/img/wn/${item.weatherInfo.weather[0].icon}@2x.png`} alt="Weather_Icon" />
								<p className={style.City__Weather__Temp}>
									{item.weatherInfo.main.temp.toFixed(0)} <WiCelsius />
								</p>
							</div>
						);
					}
				}
			})}
		</>
	);
};

export default ListFavoritisCitys;
