import { connect } from 'react-redux';
import SearchField from '../components/SearchField/SearchField';
import { ThunkDispatch } from 'redux-thunk';
import { fetchCityIfNeeded } from '../actions';
import { StoreState } from '../types';

const mapStateToProps = (state: StoreState) => {
	return {
		state,
	};
};

const mapDispathToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
	searchCity: (cityName: string) => {
		dispatch(fetchCityIfNeeded(cityName));
	},
});

export default connect(mapStateToProps, mapDispathToProps)(SearchField);
