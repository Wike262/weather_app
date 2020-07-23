import React from 'react';
import { fetchCityIfNeeded } from '../../actions';
import style from './SearchField.module.scss';

const search = (searchCityName: string, dispatch: any) => {
	dispatch(fetchCityIfNeeded(searchCityName));
};
interface Props {
	state: any;
	dispatch: any;
}

const searchField = ({ state, dispatch }: Props) => {
	return (
		<div>
			<input type="text" id="SearchInput" className={style.Search__Input} />
			<button
				className={style.Search__Button}
				onClick={(e) => search((document.getElementById('SearchInput') as HTMLInputElement).value, dispatch)}
				type="submit"
			>
				Search
			</button>
		</div>
	);
};

export default searchField;
