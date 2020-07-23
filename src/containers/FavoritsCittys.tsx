import { connect } from 'react-redux';
import FavoritsCitys from '../components/listFavorits/ListFavoritsCitys';

const mapStateToProps = (state: any, ownProps: any) => {
	return {
		state,
		ownProps,
	};
};

export default connect(mapStateToProps)(FavoritsCitys);
