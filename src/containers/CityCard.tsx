import { connect } from 'react-redux';
import CityCard from '../components/CityCard/cityCard';

const mapStateToProps = (state: any, ownProps: any) => {
	return {
		state,
		ownProps,
	};
};

export default connect(mapStateToProps)(CityCard);
