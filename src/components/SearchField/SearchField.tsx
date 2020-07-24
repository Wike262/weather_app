import React from 'react';
import style from './SearchField.module.scss';

interface Props {
	searchCity: Function;
}

const searchField = ({ searchCity }: Props) => {
	const search = (event: React.FormEvent) => {
		let searchCityName = (document.getElementById('SearchInput') as HTMLInputElement).value;
		event.preventDefault();
		searchCity(searchCityName);
	};

	return (
		<form onSubmit={search}>
			<input type="text" id="SearchInput" className={style.Search__Input} />
			<button className={style.Search__Button}>Search</button>
		</form>
	);
};

export default searchField;
