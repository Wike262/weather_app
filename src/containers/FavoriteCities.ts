import { connect } from 'react-redux';
import FavoriteCitys from '../components/ListFavorite/ListFavoriteCities';
import { StoreState, City } from '../types';
import { ThunkDispatch } from 'redux-thunk';
import { setCurrentCity, fetchCityIfNeeded, setFavoriteCities } from '../actions';

const mapStateToProps = (state: StoreState, ownProps: { FavoriteCities: Array<string> }) => {
	return {
		state: state.cities.filter((item: City) => item.isFavorit),
		FavoriteCities: ownProps.FavoriteCities,
	};
};

const mapDispathToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
	setCity: (cityName: string, city: City) => {
		dispatch(setCurrentCity(cityName, city));
	},
	getCity: (cityName: string, id: number) => {
		dispatch(fetchCityIfNeeded(cityName, id));
	},
	setFavoriteCities: (cities: Array<string>) => {
		dispatch(setFavoriteCities(cities));
	},
});

export default connect(mapStateToProps, mapDispathToProps)(FavoriteCitys);
