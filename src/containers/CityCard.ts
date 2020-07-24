import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import CityCard from '../components/CityCard/CityCard';
import { removeCurrentCity, setFavoriteCities } from '../actions';
import { StoreState, City } from '../types';

const mapStateToProps = (state: StoreState) => {
	return {
		state: state.cities.find((item: City) => item.isCurrent),
	};
};

const mapDispathToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
	removeCurrentCity: (id: number) => {
		dispatch(removeCurrentCity(id));
	},
	setFavoriteCities: (cities: Array<string>) => {
		dispatch(setFavoriteCities(cities));
	},
});

export default connect(mapStateToProps, mapDispathToProps)(CityCard);
