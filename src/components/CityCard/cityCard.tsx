import React from 'react';
import Modal from 'react-modal';
import { removeCurrentCity } from '../../actions';
import style from './cityCard.module.scss';
import { FaTimes } from 'react-icons/fa';
import { WiCelsius } from 'react-icons/wi';
Modal.setAppElement(document.getElementById('root')!);

const close = (dispatch: any) => {
	dispatch(removeCurrentCity());
};

const CityCard = (props: any) => {
	const addToStorage = () => {
		localStorage.setItem(`FavoritCity-${props.state.currentCity.weather.name}`, props.state.currentCity.weather.name);
	};
	if (props.state.currentCity.weatherInfo && props.state.currentCity.weatherInfo.cod === '404') {
		return (
			<Modal
				style={{
					overlay: {
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						background: 'rgba(0,0,0,.75)',
					},
					content: { width: '250px', top: 'none', bottom: 'none', left: 'none', right: 'none' },
				}}
				parentSelector={() => document.getElementById('root')!}
				isOpen={true}
			>
				<h1>Not found! Sorry)</h1>{' '}
				<button onClick={() => close(props.dispatch)} className={style.City__Weather__Button_close}>
					<FaTimes />
				</button>
			</Modal>
		);
	}
	if (props.state.currentCity.weatherInfo.id !== 0) {
		return (
			<Modal
				style={{
					overlay: {
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						background: 'rgba(0,0,0,.75)',
					},
					content: { width: '250px', top: 'none', bottom: 'none', left: 'none', right: 'none' },
				}}
				parentSelector={() => document.getElementById('root')!}
				isOpen={true}
			>
				<div className={style.City__Weather}>
					<h1 className={style.City__Weather__Name}>{props.state.currentCity.weatherInfo.name}</h1>
					<div className={style.City__Weather__Wrapper}>
						<h3 className={style.City__Weather__Description}>{props.state.currentCity.weatherInfo.weather[0].description}</h3>
						<img
							src={`http://openweathermap.org/img/wn/${props.state.currentCity.weatherInfo.weather[0].icon}@2x.png`}
							alt="Weather_Icon"
						/>

						<p className={style.City__Weather__Temp}>
							{props.state.currentCity.weatherInfo.main.temp.toFixed(0)} <WiCelsius />
						</p>
					</div>
					<div className={style.City__Weather__Wrapper}>
						<p className={style.City__Weather__Wind}>
							Wind:
							{props.state.currentCity.weatherInfo.wind.speed} m/s {props.state.currentCity.weatherInfo.wind.deg} degres
						</p>
					</div>
				</div>
				<button onClick={() => close(props.dispatch)} className={style.City__Weather__Button_close}>
					<FaTimes />
				</button>
				<button onClick={() => addToStorage()} className={style.City__Weather__Button_Favorit}>
					AddToFavorit
				</button>
			</Modal>
		);
	} else if (props.state.currentCity.isFetching) {
		return (
			<Modal
				style={{
					overlay: {
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						background: 'rgba(0,0,0,.75)',
					},
					content: { width: '250px', top: 'none', bottom: 'none', left: 'none', right: 'none' },
				}}
				parentSelector={() => document.getElementById('root')!}
				isOpen={true}
			>
				<h1>Loading</h1>
			</Modal>
		);
	} else return <></>;
};

export default CityCard;
