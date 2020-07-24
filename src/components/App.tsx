import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import SearchField from '../containers/SearchFiled';
import CityCard from '../containers/CityCard';
import ListFavoriteCitys from '../containers/FavoriteCities';
import style from './App.module.scss';

const loggerMiddleware = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

interface State {
	FavoriteCities: Array<string>;
}

class App extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);
		this.state = { FavoriteCities: [] };
	}

	componentDidMount() {
		if (!!localStorage['FavoriteCities']) {
			let handler = [];
			handler = JSON.parse(localStorage['FavoriteCities']);
			this.setState({
				FavoriteCities: handler,
			} as State);
		}
	}

	public render() {
		return (
			<Provider store={store}>
				<React.StrictMode>
					<div className={style.WeatherApp}>
						<SearchField />
						<ListFavoriteCitys FavoriteCities={this.state.FavoriteCities} />
						<CityCard />
					</div>
				</React.StrictMode>
			</Provider>
		);
	}
}

export default App;
