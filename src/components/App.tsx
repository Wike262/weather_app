import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import SearchField from '../containers/SearchFiled';
import CityCard from '../containers/CityCard';
import ListFavoritisCitys from '../containers/FavoritsCittys';
import style from './App.module.scss';

const loggerMiddleware = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

function App() {
	return (
		<Provider store={store}>
			<React.StrictMode>
				<div className={style.WeatherApp}>
					<SearchField />
					<CityCard />
					<ListFavoritisCitys />
				</div>
			</React.StrictMode>
		</Provider>
	);
}

export default App;
