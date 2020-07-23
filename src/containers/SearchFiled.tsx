import { connect } from 'react-redux';
import searchField from '../components/SearchField/SearchField';

const mapStateToProps = (state: any, ownProps: any) => {
	return {
		state,
		ownProps,
	};
};

export default connect(mapStateToProps)(searchField);
