import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { WiCelsius } from 'react-icons/wi';
import ModalWindow from '../Modal/Modal';
import { City } from '../../types';
import style from './cityCard.module.scss';

Modal.setAppElement(document.getElementById('root')!);

interface Props {
	state: City | undefined;
	setFavoriteCities: Function;
	removeCurrentCity: Function;
}

const CityCard = ({ state, removeCurrentCity, setFavoriteCities }: Props) => {
	if (!!state) {
		const addToStorage = (name: string) => {
			let handler: string[] = !!localStorage['FavoriteCities'] ? JSON.parse(localStorage['FavoriteCities']) : [];
			if (!!handler.findIndex((item: string) => item === name)) {
				handler.push(name);
				removeCurrentCity(state.id);
				setFavoriteCities([name]);
				localStorage['FavoriteCities'] = JSON.stringify(handler);
			}
		};
		if (state.isFetching) {
			return (
				<ModalWindow>
					<h1>Loading</h1>
				</ModalWindow>
			);
		} else if (state?.weatherInfo?.cod !== 200) {
			return (
				<ModalWindow>
					<>
						<h1>Not found! Sorry)</h1>{' '}
						<button onClick={() => removeCurrentCity(state.id)} className={style.City__Weather__Button_close}>
							<FaTimes />
						</button>
					</>
				</ModalWindow>
			);
		} else if (state.weatherInfo.id) {
			return (
				<ModalWindow>
					<>
						<div className={style.City__Weather}>
							<h1 className={style.City__Weather__Name}>{state.weatherInfo.name}</h1>
							<div className={style.City__Weather__Wrapper}>
								<h3 className={style.City__Weather__Description}>{state.weatherInfo.weather[0].description}</h3>
								<img src={`http://openweathermap.org/img/wn/${state.weatherInfo.weather[0].icon}@2x.png`} alt="Weather_Icon" />
								<p className={style.City__Weather__Temp}>
									{state.weatherInfo.main.temp.toFixed(0)} <WiCelsius />
								</p>
							</div>
							<div className={style.City__Weather__Wrapper}>
								<p className={style.City__Weather__Wind}>
									Wind:
									{state.weatherInfo.wind.speed} m/s {state.weatherInfo.wind.deg} degres
								</p>
							</div>
						</div>
						<button onClick={() => removeCurrentCity(state.id)} className={style.City__Weather__Button_close}>
							<FaTimes />
						</button>
						<button onClick={() => addToStorage(state.weatherInfo.name)} className={style.City__Weather__Button_Favorit}>
							AddToFavorit
						</button>
					</>
				</ModalWindow>
			);
		} else return <></>;
	} else return <></>;
};

export default CityCard;
